// QuantityModal.js
import React from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuantityModal = ({
  isVisible,
  onQuantityChange,
  selectedQuantity,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn số lượng</Text>
          <View style={styles.quantityButtonsContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(-1)}
            >
              <Icon name="minus" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.selectedQuantity}>{selectedQuantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(1)}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Xác nhận" onPress={onConfirm} />
            <Button title="Hủy" onPress={onCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
};

export default QuantityModal;
