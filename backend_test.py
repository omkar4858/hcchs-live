#!/usr/bin/env python3
"""
Backend API Testing Script for Humanity Care College (Database-Free Version)
Tests the refactored backend that uses only Gmail SMTP (no MongoDB)
"""

import requests
import time
import json
from datetime import datetime

# Read backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    raise ValueError("REACT_APP_BACKEND_URL not found in /app/frontend/.env")

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

print(f"Testing DATABASE-FREE backend at: {API_BASE}")
print("=" * 80)

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_name, details=""):
    test_results["passed"].append(test_name)
    print(f"✅ PASS: {test_name}")
    if details:
        print(f"   {details}")

def log_fail(test_name, details=""):
    test_results["failed"].append(test_name)
    print(f"❌ FAIL: {test_name}")
    if details:
        print(f"   {details}")

def log_warning(test_name, details=""):
    test_results["warnings"].append(test_name)
    print(f"⚠️  WARNING: {test_name}")
    if details:
        print(f"   {details}")

# Test 1: GET /api/ - Root endpoint
print("\n[Test 1] GET /api/ - Root endpoint")
print("-" * 80)
try:
    response = requests.get(f"{API_BASE}/", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("message") == "Humanity Care College API":
            log_pass("GET /api/", f"Response: {data}")
        else:
            log_fail("GET /api/", f"Unexpected message: {data}")
    else:
        log_fail("GET /api/", f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("GET /api/", f"Exception: {str(e)}")

# Test 2: GET /api/health - Health check
print("\n[Test 2] GET /api/health - Health check")
print("-" * 80)
try:
    response = requests.get(f"{API_BASE}/health", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "ok" and "smtp_configured" in data:
            smtp_status = data.get("smtp_configured")
            if smtp_status is True:
                log_pass("GET /api/health", f"Response: {data} - SMTP is configured")
            else:
                log_fail("GET /api/health", f"SMTP not configured: {data}")
        else:
            log_fail("GET /api/health", f"Unexpected response structure: {data}")
    else:
        log_fail("GET /api/health", f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("GET /api/health", f"Exception: {str(e)}")

# Test 3: POST /api/applications - Validation (missing required field 'course')
print("\n[Test 3] POST /api/applications - Validation (missing 'course')")
print("-" * 80)
try:
    payload = {
        "fullName": "QA Test Applicant - Missing Course",
        "email": "qa-validation-test@example.com",
        "phone": "9876543210"
        # Missing 'course' - should fail validation
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    if response.status_code == 422:
        log_pass("POST /api/applications validation (missing 'course')", "Correctly returned 422")
    else:
        log_fail("POST /api/applications validation (missing 'course')", 
                f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications validation (missing 'course')", f"Exception: {str(e)}")

# Test 4: POST /api/applications - Validation (invalid email)
print("\n[Test 4] POST /api/applications - Validation (invalid email)")
print("-" * 80)
try:
    payload = {
        "fullName": "QA Test Applicant - Invalid Email",
        "email": "not-an-email",
        "phone": "9876543210",
        "course": "BCA"
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    if response.status_code == 422:
        log_pass("POST /api/applications validation (invalid email)", "Correctly returned 422")
    else:
        log_fail("POST /api/applications validation (invalid email)", 
                f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications validation (invalid email)", f"Exception: {str(e)}")

# Test 5: POST /api/applications - Valid submission
print("\n[Test 5] POST /api/applications - Valid submission (Database-Free)")
print("-" * 80)
application_id = None
start_time = time.time()
try:
    payload = {
        "fullName": "QA Test Applicant - No DB",
        "email": "qa-nodb-test@example.com",
        "phone": "9999999999",
        "course": "BCA",
        "dob": "2002-05-10",
        "gender": "male",
        "qualification": "10+2 PCM",
        "address": "Test Address, Muzaffarpur",
        "message": "Testing the database-free version."
    }
    response = requests.post(f"{API_BASE}/applications", json=payload, timeout=10)
    response_time = time.time() - start_time
    
    if response.status_code == 200:
        data = response.json()
        if data.get("success") and "id" in data and "message" in data:
            application_id = data["id"]
            log_pass("POST /api/applications (valid submission)", 
                    f"Application submitted successfully. ID: {application_id}, Response time: {response_time:.2f}s")
            
            # Check response time (should be under 2s since email is in BackgroundTasks)
            if response_time < 2.0:
                log_pass("POST /api/applications (response time)", 
                        f"Response time {response_time:.2f}s < 2s (email in background)")
            else:
                log_warning("POST /api/applications (response time)", 
                           f"Response time {response_time:.2f}s >= 2s (may not be using BackgroundTasks)")
        else:
            log_fail("POST /api/applications (valid submission)", f"Unexpected response structure: {data}")
    else:
        log_fail("POST /api/applications (valid submission)", 
                f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    log_fail("POST /api/applications (valid submission)", f"Exception: {str(e)}")

# Test 6: Wait and check backend logs for SMTP confirmation
print("\n[Test 6] Waiting 6 seconds for background email task to complete...")
print("-" * 80)
if application_id:
    time.sleep(6)
    
    print("Checking backend logs for SMTP confirmation...")
    import subprocess
    try:
        # Check backend error logs for email confirmation
        result = subprocess.run(
            ["tail", "-n", "50", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        log_content = result.stdout
        
        # Look for success message
        success_pattern = f"Application email sent to educafirst1@gmail.com for QA Test Applicant - No DB"
        failure_pattern = "Failed to send application email"
        
        if success_pattern in log_content:
            log_pass("SMTP Email Verification", 
                    "✅ Found log: 'Application email sent to educafirst1@gmail.com for QA Test Applicant - No DB'")
        elif failure_pattern in log_content:
            log_fail("SMTP Email Verification", 
                    "❌ Found 'Failed to send application email' in logs. Check exception details.")
            print("\n   📋 Recent backend logs:")
            print("   " + "\n   ".join(log_content.split("\n")[-20:]))
        else:
            log_warning("SMTP Email Verification", 
                       "Could not find email confirmation in logs. Email may still be processing.")
            print("\n   📋 Recent backend logs:")
            print("   " + "\n   ".join(log_content.split("\n")[-20:]))
            
    except Exception as e:
        log_fail("SMTP Email Verification", f"Failed to check logs: {str(e)}")
else:
    log_warning("SMTP Email Verification", "Skipped - no application ID from previous test")

# Test 7: Verify no MongoDB dependency
print("\n[Test 7] Verify no MongoDB dependency")
print("-" * 80)
try:
    # Check if backend code imports motor or pymongo
    with open('/app/backend/server.py', 'r') as f:
        backend_code = f.read()
    
    if 'motor' in backend_code or 'pymongo' in backend_code:
        log_fail("No MongoDB dependency", "Found 'motor' or 'pymongo' imports in backend code")
    else:
        log_pass("No MongoDB dependency", "Backend code does not import motor or pymongo")
        
    # Check if MongoDB-related endpoints exist
    if '/api/applications' in backend_code and 'GET' in backend_code:
        # Check if there's a GET handler for /api/applications
        if '@api_router.get("/applications")' in backend_code:
            log_fail("No MongoDB dependency", "Found GET /api/applications endpoint (should not exist in DB-free version)")
        else:
            log_pass("No MongoDB dependency", "No GET /api/applications endpoint found")
    
except Exception as e:
    log_fail("No MongoDB dependency", f"Exception: {str(e)}")

# Summary
print("\n" + "=" * 80)
print("TEST SUMMARY - DATABASE-FREE BACKEND")
print("=" * 80)
print(f"✅ Passed: {len(test_results['passed'])}")
for test in test_results['passed']:
    print(f"   - {test}")

if test_results['warnings']:
    print(f"\n⚠️  Warnings: {len(test_results['warnings'])}")
    for test in test_results['warnings']:
        print(f"   - {test}")

if test_results['failed']:
    print(f"\n❌ Failed: {len(test_results['failed'])}")
    for test in test_results['failed']:
        print(f"   - {test}")
    print("\n🔍 For detailed error logs, check:")
    print("   tail -n 100 /var/log/supervisor/backend.err.log")
else:
    print("\n🎉 All critical tests passed!")

print("=" * 80)
