import { NextResponse } from "next/server"

interface ValidationRequest {
  email: string
  password: string
}

const validateEmail = (email: string) => {
  const domain = "@posindonesia.co.id"
  const emailRegex = /^[a-zA-Z0-9._-]+@posindonesia\.co\.id$/
  return email.endsWith(domain) && emailRegex.test(email)
}

const validatePassword = (password: string) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  return strongRegex.test(password)
}

export async function POST(request: Request) {
  try {
    const body: ValidationRequest = await request.json()
    const { email, password } = body

    const errors: string[] = []

    if (!validateEmail(email)) {
      errors.push("Email must be a valid @posindonesia.co.id address")
    }

    if (!validatePassword(password)) {
      errors.push(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      )
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, errors: ["An unexpected error occurred"] }, { status: 500 })
  }
}

