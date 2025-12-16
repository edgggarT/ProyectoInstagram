import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Home = () => {


    return (
        <View style={{ flex: 1 }}>

            {/* -------- BARRA SUPERIOR -------- */}
            <View 
                style={{
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50,
                    marginTop: 35,
                }}
            >
                <TouchableOpacity>
                    <Image 
                        style={{ height: 24, width: 30 }} 
                        source={require('../../../assets/agregar.jpg')} 
                    />
                </TouchableOpacity>

                <Image 
                    style={{ height: 32, width: 110 }} 
                    source={require('../../../assets/instagram.png')}
                />

                <TouchableOpacity>
                    <Image 
                        style={{ height: 24, width: 30 }} 
                        source={require('../../../assets/Corazon (2).jpg')} 
                    />
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default Home;
