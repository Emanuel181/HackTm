from flask import Blueprint, send_file
from flask_cors import CORS
from pdf import generate_pdf_buffer

report_api = Blueprint("report_api", __name__)
CORS(report_api)  # <-- ✅ this enables CORS for all routes in the blueprint

@report_api.route("/report/download", methods=["GET"])
def download_report():
    buffer = generate_pdf_buffer()
    return send_file(
        buffer,
        as_attachment=True,
        download_name="sesizari_report.pdf",
        mimetype="application/pdf"
    )
