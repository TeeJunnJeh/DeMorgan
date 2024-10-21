import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, Button, StyleSheet, Modal, ImageBackground,
} from 'react-native';

const ProfileScreen = ({ route }) => {
  const { username } = route?.params || {};
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(require('../assets/images/avatar/default.jpg')); // Default avatar
  const [selectedAvatar, setSelectedAvatar] = useState(1); // Default avatar selection
  const [isEditable, setIsEditable] = useState(true); // Determines if fields are editable
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false); // Modal visibility

  const avatars = [
    require('../assets/images/avatar/avatar1.jpg'),
    require('../assets/images/avatar/avatar2.jpg'),
    require('../assets/images/avatar/avatar3.jpg'),
    require('../assets/images/avatar/avatar4.jpg'),
  ];

  // Fetch user data from the Flask API
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5001/user?username=${username}`);
      const data = await response.json();
      if (response.ok) {
        setName(data.username);
        setDob(data.dateOfBirth);
        setEmail(data.emailAddress);
        setSelectedAvatar(data.avatar || 4); // Set avatar if available, else default to 4
        setAvatar(avatars[data.avatar - 1] || avatars[0]); // Select avatar based on fetched avatar value
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Toggle the edit/save functionality
  const handleSaveOrEdit = async () => {
    if (isEditable) {
      try {
        const response = await fetch('http://10.0.2.2:5001/user/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            name,
            dateOfBirth: dob,
            emailAddress: email,
            avatar: selectedAvatar, // Sending avatar index or value
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Profile information saved!');
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Failed to update user data:', error);
        alert('Failed to save profile information.');
      }
    }
    setIsEditable(!isEditable);
  };

  // Change avatar from modal
  const selectAvatar = (index) => {
    setAvatar(avatars[index]);
    setSelectedAvatar(index + 1);
    setIsAvatarModalVisible(false); // Close the modal
  };

  return (
    <ImageBackground 
      source={require('../assets/images/profile/background.jpeg')} // Replace with your background image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>My Profile</Text>

        {/* Avatar Section */}
        <TouchableOpacity onPress={() => isEditable && setIsAvatarModalVisible(true)}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity>

        {/* Modal for avatar selection */}
        <Modal
          transparent={true}
          visible={isAvatarModalVisible}
          animationType="slide"
          onRequestClose={() => setIsAvatarModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Select Avatar</Text>
              <View style={styles.avatarGrid}>
                {avatars.map((avatarOption, index) => (
                  <TouchableOpacity key={index} onPress={() => selectAvatar(index)}>
                    <Image source={avatarOption} style={styles.avatarOption} />
                  </TouchableOpacity>
                ))}
              </View>
              <Button title="Close" onPress={() => setIsAvatarModalVisible(false)} />
            </View>
          </View>
        </Modal>

        {/* Form Section */}
        <View style={styles.form}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            editable={isEditable}
          />

          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={dob}
            onChangeText={setDob}
            editable={isEditable}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            editable={isEditable}
          />

          <Button title={isEditable ? 'Save' : 'Edit'} onPress={handleSaveOrEdit} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#692A5A', 
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', 
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});



export default ProfileScreen;
