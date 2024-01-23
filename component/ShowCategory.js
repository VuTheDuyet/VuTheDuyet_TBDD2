import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ShowCategory() {
    const [selectedCategory, setSelectedCategory] = useState('All');
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {allCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryContainer,
              { backgroundColor: selectedCategory === category ? 'gray' : 'lightgray' },
            ]}
            onPress={() => {
              setSelectedCategory(category);
            }}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})