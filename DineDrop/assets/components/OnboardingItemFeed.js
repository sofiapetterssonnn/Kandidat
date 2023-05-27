import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import PublishedPostFeed from "./publishedPostFeed";

export default OnboradingItemFeed = ({item}) => {
    const {width} = useWindowDimensions();
    console.log("hejsan")

    return (
        <View style={[styles.container, {width}]}>
            
              <PublishedPostFeed item= {item} />  
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
