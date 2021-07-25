import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { supabase } from '../api'

// Este componente renderiza un editor de Markdown, permitiendo al usuario crear posts:
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const initialState = { title: '', content: '' }

function CreatePost() {
    const [post, setPost] = useState(initialState);
    const { title, content, image_link } = post;
    const router = useRouter();

    function onChange(e) {
        setPost(()=> ({...post, [e.target.name]: e.target.value}))
    }

    // La funcion createNewPost usa la instancia de supabase para crear nuevos posts usando el estado local del formulario:
    // supabase client automaticamente incluye el access token en los headers para los usuarios que están logeados.
    async function createNewPost() {
        if (!title || !content) return;
        const user = supabase.auth.user();
        const id = uuid();
        post.id = id;
        const { data } = await supabase
            .from('posts')
            .insert([{ title, content, image_link, user_id: user.id, user_email: user.email }])
            .single()
        router.push(`/posts/${data.id}`)
        
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6">Crear nuevo post</h1>
            <input type="text"
                onChange={onChange}
                name="title"
                placeholder="Título"
                value={post.title}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            
            />
            <input type="text"
                onChange={onChange}
                name="image_link"
                placeholder="https://dominio.com/imagen.jpg"
                value={post.image_link}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            
            />
            <SimpleMDE
                value={post.content}
                onChange={value => setPost({...post, content:value})}
            />
            <button type="button"
                className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
                onClick={createNewPost}
            
            >Crear post</button>
        </div>
    )
}
export default CreatePost