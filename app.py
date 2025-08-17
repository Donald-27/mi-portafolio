from flask import Flask, render_template, send_from_directory, jsonify, request
from flask_cors import CORS
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import urllib.parse

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "kipropdonald27@gmail.com"
EMAIL_PASSWORD = "hnsr tnmt tztf bkhh"

# Serve the main portfolio page
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

# Serve analytics dashboard
@app.route('/analytics')
@app.route('/analytics.html')
def analytics():
    return send_from_directory('.', 'analytics.html')

# Serve analytics JavaScript
@app.route('/analytics.js')
def analytics_js():
    return send_from_directory('.', 'analytics.js')

# Serve resume page
@app.route('/resume')
@app.route('/resume.html')
def resume():
    return send_from_directory('.', 'resume.html')

# Serve static files (images, etc.)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# API endpoint for email sending (used by contact form)
@app.route('/api/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        send_method = data.get('method', 'email')  # 'email' or 'whatsapp'
        
        if not all([name, email, subject, message]):
            return jsonify({'error': 'All fields are required'}), 400
        
        if send_method == 'whatsapp':
            # Format message for WhatsApp
            whatsapp_message = f"""
New Contact Form Message:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
            """.strip()
            
            # Create WhatsApp link
            encoded_message = urllib.parse.quote(whatsapp_message)
            whatsapp_url = f"https://wa.me/254724779523?text={encoded_message}"
            
            return jsonify({
                'success': True,
                'message': 'WhatsApp link generated',
                'whatsapp_url': whatsapp_url
            })
        
        else:
            # Send email
            msg = MIMEMultipart()
            msg['From'] = EMAIL_ADDRESS
            msg['To'] = EMAIL_ADDRESS
            msg['Subject'] = f"Portfolio Contact: {subject}"
            
            # Create email body
            body = f"""
New message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Sent from your portfolio contact form
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            text = msg.as_string()
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, text)
            server.quit()
            
            return jsonify({
                'success': True,
                'message': 'Email sent successfully!'
            })
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to send message'}), 500

# API endpoint for analytics data (for future backend integration)
@app.route('/api/analytics', methods=['POST'])
def save_analytics():
    try:
        data = request.get_json()
        
        # Here you could save to a database if needed
        # For now, we'll just acknowledge receipt
        print(f"📊 Analytics data received: {data.get('totalInteractions', 0)} interactions, {data.get('totalPageViews', 0)} page views")
        
        return jsonify({
            'success': True,
            'message': 'Analytics data received'
        })
        
    except Exception as e:
        print(f"Analytics error: {str(e)}")
        return jsonify({'error': 'Failed to save analytics data'}), 500

# API endpoint for contact form (this is a placeholder and not fully implemented as per original code)
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        # Handle contact form submission (e.g., call send_email or other logic)
        print(f"Contact form submitted: {data}")
        # For demonstration, let's assume it calls the send_email logic if not already handled
        # In a real scenario, you'd integrate this properly.
        # This part is kept minimal to match the original intent of having a /api/contact route.
        return jsonify({"success": True, "message": "Contact form data received"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Remove favicon route if not strictly needed or handled by static serving
# @app.route('/favicon.ico')
# def favicon():
#     return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)