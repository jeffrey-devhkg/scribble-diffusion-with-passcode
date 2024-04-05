// pages/login.js

import { useState } from 'react'
import { useRouter } from 'next/router'  
import Airtable from 'airtable'

const base = new Airtable({apiKey: process.env.AIRTABLE_PERSONAL_TOKEN}).base(process.env.AIRTABLE_BASE_ID)

export default function Login() {

  const [passcode, setPasscode] = useState('')

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    
    const records = await base('Passcodes').select().firstPage()
    const match = records.find(r => r.get('Passcode') === passcode)

    if (match) {
      // Save or set auth token
      
      router.push('/') // Redirect to home on success
    } else {
      // Show error message
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Passcode input */}
      <button type="submit">Submit</button> 
    </form>
  )

}
