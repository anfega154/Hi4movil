import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, Button, Alert } from 'react-native';
import { supabase } from '../Lib/SupabasseClient';

function ComposePost({ userAvatarUrl, iduser }) {
    const [pending, setPending] = useState(false);
    const contentRef = useRef();
    const [content, setContent] = useState('');

    const addPost = async () => {
        setPending(true);

        if (!content) {
            setPending(false);
            return;
        }

        if (content.length > 280) {
            Alert.alert('El contenido no puede superar los 280 caracteres.');
            setPending(false);
            setContent('');
            return;
        }

        try {
            const {data,error} = await supabase.from('posts').upsert([{ content, user_id: iduser }]);
            if(error){
                console.error('Error inserting data:', error);
            }else{
                setPending(false);
                setContent('');
            }
           

          
        } catch (error) {
            console.error('Error posting:', error);
            setPending(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.2)' }}>
        <Image style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} source={{ uri:userAvatarUrl }} />
            <View style={{ flex: 1 }}>
                <TextInput
                    value={content}
                    onChangeText={setContent}
                    multiline
                    style={{ fontSize: 20, backgroundColor: 'white', color: 'black', padding: 10, placeholderTextColor: 'gray' }}
                    placeholder='¡¿Qué está pasando!?'
                />
                <Button
                    title={pending ? 'Posting...' : 'Postear'}
                    onPress={addPost}
                    disabled={pending}
                />
            </View>
        </View>
    );
}

export default ComposePost;
