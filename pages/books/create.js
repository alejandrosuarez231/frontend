import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
const BookCreate = () => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)
    async function handleSubmit (e) {
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method:'POST',
            headers:{
                accept: 'application/json',
                'content-type' : 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })

        if( res.ok ) {
            setErrors([])
            setBookTitle('')
            return router.push('/books')
        } 

        const data = await res.json()
        setErrors(data.errors)    
        setSubmitting(false)
        
    }
    return (
        <>
            <h1>BookCreate</h1>
            <p>{JSON.stringify(errors)}</p>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value) } 
                    type='text'
                    value={bookTitle}
                    disabled={submitting}
                    data-cy="input-book-title"
                />
                {errors.title && (
                    <span style={{ color:'red',display:'block' }}>{errors.title}</span>
                )}
                <button 
                    disabled={submitting}
                    data-cy="button-submit-book"
                    >
                        {submitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            <br/>
            <Link href="/books">Books List</Link>
        </>
    )
}
export default BookCreate