# report_routes.py

from flask import Blueprint, send_file
from pdf import generate_pdf_buffer

report_api = Blueprint("report_api", __name__)

@report_api.route("/report/download", methods=["GET"])
def download_report():
    buffer = generate_pdf_buffer()
    return send_file(
        buffer,
        as_attachment=True,
        download_name="sesizari_report.pdf",
        mimetype="application/pdf"
    )
