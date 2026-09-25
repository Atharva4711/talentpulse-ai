@echo off
echo ========================================================
echo Starting TalentPulse AI - In-House ML Inference Microservice
echo Endpoint: http://127.0.0.1:8000
echo ========================================================
cd /d "%~dp0"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
