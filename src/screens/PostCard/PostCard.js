import { View, Text, Image, TouchableOpacity, Alert, TextInput, Button, Modal,ScrollView } from 'react-native';
import { supabase } from '../../components/Lib/SupabasseClient';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';



const PostCard = ({ userFullName, username, profileImage, content, postDate, postTime, idPost }) => {

    const route = useRoute();
    const { userData } = route.params;
    const [likes, setLikes] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
    const [reply, setReply] = useState([]);
    const [existComent, setExistComent] = useState(false);



    const openModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
        setCommentText('');
    };

    const openCommentModal = () => {
        setIsCommentModalVisible(true);
    };
    const closeCommentModal = () => {
        setIsCommentModalVisible(false);
    };


    const handleCommentSubmit = async (commentText) => {
        const idUser = userData.id;
        const username = userData.user_name;

        try {
            const { data, error } = await supabase.from('Reply').upsert([
                { content: commentText, id_user: idUser, id_post: idPost, user_name: username }
            ]);
            if (error) {
                Alert.alert(error.toString());
            } else {
                closeModal();
                setCommentText('');
            }
        } catch (error) {
            Alert.alert('Error in comment:', error.toString());
        }

        closeModal();
        Alert.alert('Comentario exitoso');
    }


    const handleLikeClick = async () => {
        const idUser = userData.id;
        try {
            const { data, error } = await supabase.from('megusta').upsert([
                { id_user: idUser, id_post: idPost }
            ]);
            if (error) {
                Alert.alert(error.toString());
            }
        } catch (error) {
            Alert.alert('Error in like:', error.toString());
        }
    };

    useEffect(() => {
        const getLikes = () => {
            supabase
                .from('megusta')
                .select('*')
                .eq('id_post', idPost)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching likes:', error);
                    } else {
                        const count = data.length;
                        setLikes(count);
                    }
                });
        }
        const intervalId = setInterval(getLikes, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleCommentClick = () => {

        openModal();
    };

    const handleRetweetClick = () => {

        Alert.alert(`Has retwitteado el tweet de ${username}: "${content}"`);
    };

    const handleViewComent = () => {

        try{
            supabase
                .from('Reply')
                .select('*')
                .eq('id_post', idPost)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching replys:', error);
                    } else {
                        if(data.length>0){
                            setExistComent(true);
                        }
                        setReply(data);
                        openCommentModal();
                    }
                });
        }catch (error) {
            Alert.alert('Error:', error.toString());
        }
       
    }

    useEffect(() => {
        const getComments = () => {
            try{
                supabase
                    .from('Reply')
                    .select('*')
                    .eq('id_post', idPost)
                    .then(({ data, error }) => {
                        if (error) {
                            console.error('Error fetching replys:', error);
                        } else {
                            if(data){
                                if(data.length>0){
                                    setExistComent(true);
                                }
                            }
                        }
                    });
            }catch (error) {
                Alert.alert('Error:', error.toString());
            }
        }
        const intervalId = setInterval(getComments, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const comments = [
        { user: 'Usuario1', text: '¡Gran tweet!' },
        { user: 'Usuario2', text: 'Me encanta este tweet.' },];
    return (
        <View style={{ backgroundColor: 'white', borderRadius: 8, shadowColor: 'black', shadowOpacity: 0.2, padding: 16, margin: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: profileImage }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{userFullName}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>@{username}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>{postDate} at {postTime}</Text>
                </View>
            </View>
            <Text style={{ marginTop: 16 }}>{content}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <TouchableOpacity style={{ marginRight: 24 }} onPress={handleLikeClick}>
                    <Text style={{ color: 'red', fontSize: 24 }}>❤️{likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 24 }} onPress={handleCommentClick}>
                    <Text style={{ color: 'blue', fontSize: 24 }}>💬</Text>
                </TouchableOpacity>
                {existComent?(
                <TouchableOpacity onPress={handleViewComent}>
                    <Text style={{ color: 'orange', fontSize: 24 }}>💥</Text>
                </TouchableOpacity>
                 ):null}
                <TouchableOpacity onPress={handleRetweetClick}>
                    <Text style={{ color: 'blue', fontSize: 24, marginLeft: 14 }}>🔄</Text>
                </TouchableOpacity>
               

            </View>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232E3F' }}>
                    <Text style={{ color: 'white' }}>Comentar en el tweet de {username}:</Text>
                    <TextInput
                        placeholder="Escribe tu comentario"
                        onChangeText={(text) => setCommentText(text)}
                        value={commentText}
                        style={{
                            fontSize: 20, backgroundColor: 'white', color: 'black', padding: 20,
                            placeholderTextColor: 'gray', borderRadius: 8
                        }}
                        multiline
                        numberOfLines={4}
                    />
                    <CustomButton text="Comentar" onPress={() => handleCommentSubmit(commentText)} />
                    <CustomButton text="Cancelar" onPress={closeModal} type="SECONDARY" />
                </View>
            </Modal>
            <Modal visible={isCommentModalVisible} animationType="slide">
                <View style={{ flex: 1, padding:20, backgroundColor: '#232E3F'  }}>
                    <ScrollView>

                        {reply.map((comment, index) => (
                            <View key={index} style={{ padding: 10, borderBottomWidth: 1,
                             borderBottomColor: '#232E3F', backgroundColor: 'white', borderRadius:8 }}>
                                <Text style={{ fontWeight: 'bold' }}>{comment.user_name}</Text>
                                <Text>{comment.content}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <CustomButton text="Cerrar" onPress={closeCommentModal} type="SECONDARY" />
                </View>
            </Modal>
        </View>
    );
};

export default PostCard;

