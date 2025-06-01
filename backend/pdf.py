# pdf_report.py

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.units import inch
from reportlab.lib import colors
import io

from firebase_client import db
from helpers import get_all_heatmap_problems, get_all_heatmap_security, get_all_heatmap_investment
from unidecode import unidecode

def generate_pdf_buffer():
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    cell_style = ParagraphStyle(
        name='CellStyle',
        parent=styles['Normal'],
        fontSize=9,
        alignment=TA_LEFT,
        leading=11,
        wordWrap='CJK',
    )

    elements.append(Paragraph(unidecode("Sesizări Platform Report"), styles['Title']))
    elements.append(Spacer(1, 0.25 * inch))

    docs = db.collection("sesizari").stream()
    sesizari = [doc.to_dict() for doc in docs]

    total = len(sesizari)
    active = sum(1 for s in sesizari if s.get('status') == 'active')
    solutionat = total - active

    elements.append(Paragraph(unidecode(f"Total Reports: {total}"), styles['Normal']))
    elements.append(Paragraph(unidecode(f"Active: {active} | Resolved: {solutionat}"), styles['Normal']))
    elements.append(Spacer(1, 0.2 * inch))

    # Problems
    problems = get_all_heatmap_problems()
    elements.append(Paragraph(unidecode("Top Reported Categories by Neighborhood"), styles['Heading2']))
    if problems:
        problem_data = [[
            Paragraph("Neighborhood", cell_style),
            Paragraph("Top Category", cell_style)
        ]]
        for k, v in problems.items():
            problem_data.append([
                Paragraph(unidecode(k), cell_style),
                Paragraph(unidecode(v), cell_style)
            ])
        table = Table(problem_data, colWidths=[3 * inch, 3 * inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ]))
        elements.append(table)
    else:
        elements.append(Paragraph(unidecode("No data available."), styles['Normal']))
    elements.append(Spacer(1, 0.3 * inch))

    # Security
    security = get_all_heatmap_security()
    elements.append(Paragraph(unidecode("Security Scores by Neighborhood"), styles['Heading2']))
    if security:
        security_data = [[
            Paragraph("Neighborhood", cell_style),
            Paragraph("Score", cell_style)
        ]]
        for k, v in security.items():
            security_data.append([
                Paragraph(unidecode(k), cell_style),
                Paragraph(str(v), cell_style)
            ])
        table = Table(security_data, colWidths=[3 * inch, 3 * inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ]))
        elements.append(table)
    else:
        elements.append(Paragraph(unidecode("No data available."), styles['Normal']))
    elements.append(Spacer(1, 0.3 * inch))

    # Investment
    investment = get_all_heatmap_investment()
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(Paragraph(unidecode("Investment Priority Scores by Neighborhood"), styles['Heading2']))
    if investment:
        invest_data = [[
            Paragraph("Neighborhood", cell_style),
            Paragraph("Score", cell_style)
        ]]
        for k, v in investment.items():
            invest_data.append([
                Paragraph(unidecode(k), cell_style),
                Paragraph(str(v), cell_style)
            ])
        table = Table(invest_data, colWidths=[3 * inch, 3 * inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ]))
        elements.append(table)
    else:
        elements.append(Paragraph(unidecode("No data available."), styles['Normal']))
    elements.append(Spacer(1, 0.3 * inch))

    doc.build(elements)
    buffer.seek(0)
    return buffer
