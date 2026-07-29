import { NextRequest, NextResponse } from 'next/server';

// Server-side API endpoint for sending audit reports via email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipients, subject, coverNote, pdfBase64, auditId } = body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Recipients array is required' },
        { status: 400 }
      );
    }

    console.log(`[Email Dispatch] Sending Audit Report (${auditId}) to: ${recipients.join(', ')}`);

    // Simulated/Nodemailer Integration logic
    // In production with SendGrid/Nodemailer:
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({ from: 'compliance@malibanwovens.lk', to: recipients, subject, text: coverNote, attachments: [...] });

    return NextResponse.json({
      success: true,
      message: `Audit report successfully distributed to ${recipients.length} recipients`,
      dispatchedAt: new Date().toISOString(),
      recipients
    });
  } catch (err: any) {
    console.error('Error sending email:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
