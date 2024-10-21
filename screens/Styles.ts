import { StyleSheet } from 'react-native';

// Appreciation Screen styles
const appreciationStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff', // Light background color
      },
      thankYouText: {
        fontSize: 35,
        fontWeight: '900',
        color: '#1F5C76',
        marginBottom: 10,
        textAlign: 'center',
      },
      orderNumberText: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1F5C76',
        marginBottom: 10,
        textAlign: 'center',
      },
      quotesLabel: {
        fontSize: 20,
        fontWeight: '500',
        color: '#1F5C76',
        marginBottom: 10,
        textAlign: 'center',
      },
      image: {
        width: 350, // Increased size
        height: 350, // Increased size
        borderRadius: 20, // Rounded corners for the image
        marginBottom: 20,
      },
      countdownText: {
        fontSize: 16,
        color: '#1F5C76',
        marginTop: 20,
      },
});

// Checkout Screen styles
const checkoutStyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.76)', 
        flexGrow: 1,
        borderRadius: 10, 
        margin: 10,      
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1F5C76',
        marginBottom: 20,
        textAlign: 'center',
      },
      totalAmount: {
        fontSize: 20,
        fontWeight: '600',
        color: '#187BA6',
        marginBottom: 20,
        textAlign: 'center',
      },
      itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
      },
      foodImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
      },
      itemDetails: {
        flex: 1,
      },
      foodName: {
        fontSize: 20,
        fontWeight: '900', 
        color: '#444',
      },
      foodPrice: {
        fontSize: 17,
        color: '#4CAF50', 
        marginTop: 5,
        fontWeight: '600', 
      },
      emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        marginVertical: 20,
      },
      inputSection: {
        marginVertical: 20,
        paddingHorizontal: 10,
      },
      confirmationText: {
        fontSize: 17,
        textAlign: 'justify',
        marginBottom: 10,
        color: '#555',
      },
      input: {
        fontSize: 15,
        fontWeight: '500',
        height: 50,
        borderColor: '#098765',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      paymentMethodLabel: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
        color: '#333',
      },
      paymentMethodText: {
        fontSize: 17,
        fontWeight: '500', 
        color: '#333',
      },
      paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#EEE',
        marginVertical: 5,
        paddingHorizontal: 15,
      },
      selectedPaymentOption: {
        borderColor: '#FF6F61',
        borderWidth: 2,
      },
      paymentLogo: {
        width: 40,
        height: 40,
        marginRight: 10,
      },
      checkoutButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
      },
      checkoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
});

// Merge both appreciation and checkout styles
const styles = {
  ...appreciationStyles,
  ...checkoutStyles,
};

export default styles;
