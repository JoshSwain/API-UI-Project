@echo off
call env\Scripts\activate
cd app
python -m uvicorn main:app --reload
