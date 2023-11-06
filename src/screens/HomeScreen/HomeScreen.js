import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { supabase } from '../../components/Lib/SupabasseClient';
import PostList from '../PostList/PostList';
import ComposePost from '../../components/ComposePost/ComposePost';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';




function HomeScreen() {
    const route = useRoute();
    const { userData } = route.params;
    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {

        const getPsosts = () => {
            supabase
                .from('posts')
                .select('*,user:users(name, avatar_url, user_name)')
                .order('created_at', { ascending: false })
                .limit(5)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching posts:', error);
                    } else {
                        setPosts(data);
                    }
                });
        }
        const intervalId = setInterval(getPsosts, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleSingUpClick = () => {

        navigation.navigate('SignIn', { userData: '' });

    };
    return (

        <ScrollView style={styles.container}>
            <View style={styles.logoutIconContainer}>
                <TouchableOpacity style={{ marginRight: 14 }} onPress={handleSingUpClick}>
                    <Text style={{ color: 'white', fontSize: 34 }}>☒</Text>
                </TouchableOpacity>
            </View>
            <ComposePost
                userAvatarUrl={userData.avatar_url}
                iduser={userData.id}
            />
            <PostList posts={posts} />


        </ScrollView>
    )
}

ComposePost
const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        minHeight: '100%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#232E3F',
    },
    text: {
        fontSize: 15,
        color: 'white',
    },
    logoutIconContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    }
});

export default HomeScreen