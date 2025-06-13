# classification_service/app.py

from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.preprocessing.sequence import pad_sequences
from googletrans import Translator # <--- BARU: Impor Translator
import json
import numpy as np
import re
import os

app = Flask(__name__)

# --- Konfigurasi ---
MODEL_PATH = 'best_model_health_optimized.h5' 
TOKENIZER_PATH = 'tokenizer_health_optimized.json' 
MAX_LEN = 150 

# --- Muat Model, Tokenizer, dan Translator saat startup ---
model = None
tokenizer = None
translator = None # <--- BARU: Inisialisasi variabel translator

try:
    if os.path.exists(MODEL_PATH) and os.path.exists(TOKENIZER_PATH):
        # 1. Muat Model
        model = tf.keras.models.load_model(MODEL_PATH)
        print("✅ Model berhasil dimuat.")
        
        # 2. Muat Tokenizer
        with open(TOKENIZER_PATH, 'r', encoding='utf-8') as f:
            json_string = f.read()
            tokenizer = tokenizer_from_json(json_string)
        print("✅ Tokenizer berhasil dimuat.")

        # 3. Inisialisasi Translator
        translator = Translator()
        print("✅ Translator berhasil diinisialisasi.")

    else:
        print(f"❌ Error: Salah satu atau kedua file model/tokenizer tidak ditemukan.")
        print(f"Path Model: {os.path.abspath(MODEL_PATH)}")
        print(f"Path Tokenizer: {os.path.abspath(TOKENIZER_PATH)}")

except Exception as e:
    print(f"❌ Terjadi error saat memuat resource: {e}")

# --- Fungsi Helper ---

# Fungsi ini tetap sama, untuk membersihkan teks SETELAH diterjemahkan
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text, re.UNICODE)
    text = re.sub(r'\d+', '', text)
    text = text.strip()
    return text

# Fungsi untuk menerjemahkan teks dari Indonesia ke Inggris
def translate_to_english(text_id):
    try:
        translated = translator.translate(text_id, src='id', dest='en')
        return translated.text
    except Exception as e:
        print(f"Error saat menerjemahkan: {e}")
        # Jika gagal, kembalikan teks asli agar tidak crash
        return text_id

# --- Endpoint Klasifikasi (DIUBAH TOTAL) ---
@app.route('/classify', methods=['POST'])
def classify_emotion():
    # Pastikan semua komponen siap
    if not all([model, tokenizer, translator]):
        return jsonify({'error': 'Model/Tokenizer/Translator tidak siap untuk digunakan'}), 500

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Request body harus berisi "text" dalam Bahasa Indonesia'}), 400

    try:
        # 1. Ambil teks asli (Indonesia)
        text_indo = data['text']
        print(f"\n--- Menerima Teks (ID): '{text_indo}' ---")

        # 2. Terjemahkan ke Bahasa Inggris
        text_eng = translate_to_english(text_indo)
        print(f"Hasil Terjemahan (EN): '{text_eng}'")

        # 3. Preprocessing teks Bahasa Inggris
        cleaned_text_eng = preprocess_text(text_eng)

        # 4. Tokenisasi & Padding
        sequence = tokenizer.texts_to_sequences([cleaned_text_eng])
        padded_sequence = pad_sequences(sequence, maxlen=MAX_LEN, padding='post', truncating='post')

        # 5. Prediksi dengan model
        prediction = model.predict(padded_sequence)
        
        # 6. Ambil hasil dan format output
        labels = ['sadness', 'suicidal', 'anger', 'fear'] 
        predicted_index = np.argmax(prediction[0])
        probability = float(np.max(prediction[0]))
        
        THRESHOLD = 0.75
        detected_emotion = labels[predicted_index] if probability >= THRESHOLD else 'neutral'

        print(f"Prediksi Final: {detected_emotion} (Probabilitas: {probability:.2f})")

        return jsonify({
            'emotion': detected_emotion,
            'probability': probability
        })

    except Exception as e:
        print(f"❌ Error saat proses klasifikasi: {e}")
        return jsonify({'error': 'Terjadi kesalahan internal saat klasifikasi'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)