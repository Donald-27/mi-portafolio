
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
import urllib.parse

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "kipropdonald27@gmail.com"
EMAIL_PASSWORD = "hnsr tnmt tztf bkhh"  # Your app password

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

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
