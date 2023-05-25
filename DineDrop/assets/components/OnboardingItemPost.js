import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import PublishedPost from '../components/publishedPost.js';

export default OnboradingItemPost = ({item}) => {
    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            
            <PublishedPost text={item.text} username={item.username} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
