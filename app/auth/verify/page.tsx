"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function VerifyPage() {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          router.push("/")
        }
      } else {
        router.push("/auth")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleResendVerification = async () => {
    setError("")
    setMessage("")

    try {
      const user = auth.currentUser
      if (user) {
        await sendEmailVerification(user)
        setMessage("Verification email sent. Please check your inbox.")
      } else {
        setError("No user found. Please try logging in again.")
      }
    } catch (error) {
      setError("Failed to send verification email. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Please verify your email to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            We've sent a verification email to your inbox. Please click the link in the email to verify your account.
          </p>
          <Button className="w-full" onClick={handleResendVerification}>
            Resend Verification Email
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && (
            <Alert variant="default" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

