# 🧠 Custom AI/ML Engineering Blueprint: In-House Model Training & Deployment

> **Project:** TalentPulse AI — Campus Recruitment & Interview Intelligence Platform  
> **Academic Program:** Final Year Diploma in Information Technology  
> **Objective:** Transition from generic third-party APIs to proprietary, fine-tuned, and quantized edge AI/ML models engineered from scratch by the student development team.

---

## 🏛️ Executive Rationale: Why In-House Models Dominate College Evaluations

When external examiners, college HODs, or industry evaluators inspect a Final Year Capstone project, they look for genuine engineering depth:
- **Generic API Wrappers** (calling OpenAI/Gemini endpoints) are perceived as superficial and trivial.
- **Custom In-House Trained Models** demonstrate mastery of data preprocessing, model selection, loss functions, hyperparameter tuning, evaluation metrics (F1-score, Precision, Recall, Perplexity, ROC-AUC), and edge deployment.

By training your own specialized models, your team owns the intellectual property (IP), eliminates recurring API costs, ensures 100% candidate privacy, and can present real **training curves and confusion matrices** during the viva voce.

---

## 🔬 The 4 In-House AI/ML Model Architectures

```mermaid
graph TD
    subgraph Model 1 [1. Custom ATS Resume Intelligence]
        A1[Kaggle Resume Dataset] --> B1[DistilRoBERTa / DeBERTa Token Classifier]
        B1 --> C1[Named Entity Recognition: Skills, Metrics, Roles]
        C1 --> D1[ONNX Web Quantized INT8 Engine]
    end

    subgraph Model 2 [2. Custom AI HR Interview Chatbot]
        A2[STAR Behavioral Corpus 10k Q&A] --> B2[Llama-3.2 1B/3B or Qwen-2.5 1.5B]
        B2 --> C2[Unsloth QLoRA Fine-Tuning on Colab T4]
        C2 --> D2[WebLLM WebGPU / Ollama Local Inference]
    end

    subgraph Model 3 [3. Edge Computer Vision Gaze HUD]
        A3[FER-2013 & AffectNet Dataset] --> B3[MobileNetV3 Facial Composure Classifier]
        B3 --> C3[MediaPipe 468 3D Iris Landmark Algebra]
        C3 --> D3[TensorFlow.js 60 FPS Client Pipeline]
    end

    subgraph Model 4 [4. Acoustic Cadence & Filler Detector]
        A4[Speech Audio Spectrograms] --> B4[Quantized Whisper-tiny / 1D-CNN]
        B4 --> C4[Phoneme 'Um' / 'Uh' / 'Like' Classifier]
        C4 --> D4[Web Audio API Real-Time Analyzer]
    end
```

---

## 📦 Detailed Model Breakdown & Training Resources

### 1. Custom ATS Resume Intelligence & Skill Extraction Model
- **Task:** Token classification / Named Entity Recognition (NER) to isolate Technical Skills, Frameworks, Education, and Quantifiable Metrics without manual regex lists.
- **Base Architecture:** `distilroberta-base` or `deberta-v3-small` (compact, high semantic density, sub-50ms latency).
- **Recommended Open Datasets:**
  - [Kaggle Resume Dataset](https://www.kaggle.com/datasets/snehaanbhawal/resume-dataset) (2,400+ tech resumes categorized across IT roles).
  - [Hugging Face Resume NER Corpus](https://huggingface.co/datasets/knowledgator/events_ner_resume) (Annotated tokens for skills, certifications, degrees, experience).
- **Training Pipeline:**
  - Framework: PyTorch + Hugging Face `transformers` + `seqeval`.
  - Epochs: 4–6 epochs with AdamW optimizer (`lr = 2e-5`).
  - Target Evaluation Metric: Macro F1-Score $\ge 0.89$.
- **Export & Inference:**
  - Export model weights to **ONNX INT8 format** via `optimum-cli`.
  - Run directly in Vite using `@xenova/transformers` (running 100% inside client browser memory via WebAssembly).

---

### 2. Custom AI HR Interview Chatbot & STAR Behavioral Evaluator
- **Task:** Conducting structured 4-round campus interviews (Greeting, Technical Depth, Situational Conflict, STAR Behavioral) and generating instant rubric scores (1–100) with diagnostic suggestions.
- **Base Architecture:** **Llama-3.2-1B-Instruct**, **Llama-3.2-3B-Instruct**, or **Qwen-2.5-1.5B-Instruct**.
- **Why Small Language Models (SLMs)?**
  - Parameter size (1B–3B) allows training on **free Google Colab T4 GPUs** (15GB VRAM) in under 45 minutes using QLoRA.
  - Generates responses in $<300\text{ ms}$ on local machines without expensive cloud bills.
- **Recommended Training Dataset:**
  - Prepare a 5,000–10,000 sample instruction dataset in ShareGPT / Alpaca JSON format.
- **Training Tooling:**
  - **Unsloth AI** (`pip install unsloth`): 5x faster training, 80% memory reduction, perfectly fits in free Google Colab.
  - **QLoRA (4-bit quantization)**: Train only LoRA rank adapter weights ($r=16, \alpha=32$).
- **Deployment Strategy:**
  - **Option A (Zero-Server In-Browser):** Deploy via **WebLLM** (`@mlc-ai/web-llm`) utilizing candidate's WebGPU.
  - **Option B (Local College Lab Server):** Run via **Ollama** or **vLLM** on local laptop with FastAPI endpoint (`http://localhost:11434`).

---

### 3. Custom Edge Computer Vision Gaze & Composure Model
- **Task:** 60 FPS real-time tracking of eye-contact reticle drift, head tilt (yaw, pitch, roll), and facial composure index (`Confident`, `Attentive`, `Nervous`).
- **Base Architecture:**
  - Face Mesh & Iris: **MediaPipe Face Mesh** (468 3D facial landmarks + 10 iris contour coordinates).
  - Composure & Sentiment: Lightweight **MobileNetV3-Small** fine-tuned on facial expression datasets.
- **Recommended Training Dataset:**
  - [FER-2013 Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge) (35,000 labeled $48\times 48$ grayscale facial expressions).
  - [AffectNet](http://mohammadmahoor.com/affectnet/) (Facial affect in real-world conditions).
- **Geometric Vector Algorithm (Iris Gaze):**
  $$\text{Eye Contact Ratio} = \left(1 - \frac{|x_{\text{iris}} - x_{\text{eye\_center}}|}{w_{\text{eye}}}\right) \times 100$$
- **Inference:** In-browser WebRTC Canvas loop executing at 60 FPS with $<3\text{ ms}$ compute overhead.

---

### 4. Custom Speech Cadence & Acoustic Filler Detector
- **Task:** Detecting audible filler phonemes (`"uh"`, `"um"`, `"like"`, long awkward silences $>2.5\text{s}$) and tracking Words Per Minute (WPM).
- **Base Architecture:**
  - Quantized **Whisper-tiny.en** or a custom 1D-CNN trained on Mel-Frequency Cepstral Coefficients (MFCC) audio spectrograms.
- **Dataset:** LibriSpeech speech audio segments combined with synthetically injected hesitation fillers.
- **Inference:** Web Audio API `AudioContext` analyzing frequency spectra in real-time.

---

## 🛠️ Step-by-Step Roadmap for Your Diploma Team

| Milestone | Action Item | Assigned Role | Deliverable |
| :--- | :--- | :--- | :--- |
| **Week 1** | Colab Dataset Assembly & Cleaning | Data Specialist | 5,000 clean JSON pairs for STAR Q&A + Resume text CSV |
| **Week 2** | SLM Fine-Tuning via Unsloth (Llama 3.2 1B) | ML Engineer | GGUF / LoRA adapter model hosted on Hugging Face |
| **Week 3** | DistilRoBERTa Resume NER Training | NLP Specialist | ONNX INT8 weights for in-browser client execution |
| **Week 4** | WebGL / WebGPU Client Integration | Frontend Lead | Direct connection into `aiGateway.js` with fallback |
| **Week 5** | Viva Voce Presentation Charts | QA / Lead | Loss curves, Confusion Matrix, and Accuracy benchmarks |

---

## 💡 Examiners Love This: College Viva Talking Points

When the external examiner asks: *"Did you just use ChatGPT API for this?"*, you can confidently answer:

> *"No, Sir/Madam. While the platform supports fallback cloud gateways, our core interview intelligence is powered by our **custom fine-tuned Small Language Model (Llama 3.2 1B QLoRA)** trained specifically on STAR-method interview rubrics, alongside a **client-side quantized DistilRoBERTa token classifier** for resume parsing and a **MediaPipe 60 FPS 3D facial landmark mesh** for zero-egress biometric telemetry. All models run locally on consumer hardware with zero data leakage."*

This response immediately secures top academic marks for originality, privacy compliance, and engineering depth.
