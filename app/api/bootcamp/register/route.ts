import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'
import { sendBootcampConfirmation, sendWhatsAppNotification } from '@/lib/email-utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { fullName, email, phone, university, major, graduationYear, topic, deadline } = body

    if (!fullName || !email || !phone || !university || !major || !graduationYear) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires sont requis' },
        { status: 400 }
      )
    }

    const registration = await prisma.bootcampRegistration.create({
      data: {
        fullName,
        email,
        phone,
        university,
        major,
        graduationYear,
        topic: topic || null,
        deadline: deadline ? new Date(deadline) : null,
      },
    })

    await sendBootcampConfirmation({
      to: email,
      registration: {
        fullName,
        email,
        phone,
        university,
        major,
        graduationYear,
        topic: topic || null,
        deadline: deadline ? new Date(deadline) : null,
      },
    })

    const deadlineStr = deadline
      ? new Date(deadline).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Non spécifiée'

    await sendWhatsAppNotification(
      ` *Nouvelle inscription Bootcamp*\n\n` +
      `👤 *Nom:* ${fullName}\n` +
      `📧 *Email:* ${email}\n` +
      ` *Téléphone:* ${phone}\n` +
      `🏫 *Université:* ${university}\n` +
      ` *Filière:* ${major}\n` +
      `🎓 *Graduation:* ${graduationYear}\n` +
      `📅 *Deadline:* ${deadlineStr}\n` +
      `${topic ? `📝 *Sujet PFE:* ${topic}\n` : ''}` +
      `\n🆔 *ID:* ${registration.id}`
    )

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Cet email est déjà enregistré' },
        { status: 409 }
      )
    }

    console.error('Bootcamp registration error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    )
  }
}
