import { Auth, Typography, Button } from '@supabase/ui';
const { Text } = Typography;
import { supabase } from '../api'

// Usa el componente Auth de supabase ui, este componente renderiza un formulario "sign up" y "sign in" para 
// los usuarios que no estén autenticados. y un perfil básico con un  botón "sign out" para los autenticados

function Perfil(props) {
    console.log(props);
    const { user } = Auth.useUser();
    if (user)
        return (
            <>
                <Text>Has entrado como: {user.email}</Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Salir
                </Button>
            </>
        );
    return props.children
}

export default function AuthProfile() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Perfil supabaseClient={supabase} color={"Rojo"}>
                <Auth supabaseClient={supabase}/>
            </Perfil>
        </Auth.UserContextProvider>
    )
}