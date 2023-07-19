import { useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { FIREBASE_AUTH } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth'

export default function App () {

    const router = useRouter()

    const redirect = (user) => {
        user ? router.replace('/user/worker/home') : user ?? router.replace('/screen/login')
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            redirect(user)
        });

        return unsubscribe
    }, []);

    return (
        <SafeAreaView>
            <Stack.Screen options={{headerShown: false}}/>
        </SafeAreaView>
        
    )
}