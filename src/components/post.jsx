import {View,Text,Image,TouchableOpacity,Animated,StyleSheet,TouchableWithoutFeedback,FlatList,Dimensions,} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from "react";

const { width } = Dimensions.get("window");

const publicaciones = [
  {
    id: 1,
    profile: require('./../../assets/robot.jpg'),
    imagen: [
      require('./../../assets/p1.jpg'),
      require('./../../assets/p1_2.png'),
    ],
    nombre: "R2-D2",
    descripcion: "Increible, a partir de la primera imagen cree la segunda... ",
    likes: 12000,
    comentarios: 4,
    compartidos: 1,
    location: "Chacabuco, Buenos Aires",
    time: "2 h",
    verificado: true
  },
  {
    id: 2,
    profile: require('./../../assets/robot_2.png'),
    imagen: require('./../../assets/p2.png'),
    nombre: "C-3po",
    descripcion:"Mi amiga la Gaviota...",
    likes: 6000,
    comentarios: 2,
    compartidos: 0,
    location: "Ushuaia, Tierra del Fuego",
    time: "5 h",
    verificado: false
  },
  {
    id: 3,
    profile: require('./../../assets/robot_3.png'),
    imagen: require('./../../assets/p3.jpg'),
    nombre: "WALL-E",
    descripcion: "Excelente Vista, No?",
    likes: 27000,
    comentarios: 8,
    compartidos: 3,
    location: "La Plata, Buenos Aires",
    time: "6 h",
    verificado: true
  },
  {
    id: 4,
    profile: require('./../../assets/robot_4.png'),
    imagen: require('./../../assets/p4.jpg'),
    nombre: "HAL 9000",
    descripcion:"La cabaña, esperemos tenga calefacción.",
    likes: 9999,
    comentarios: 325,
    compartidos: 120,
    location: "Córdoba, Córdoba",
    time: "8 h",
    verificado: true
  },
  {
    id: 5,
    profile: require('./../../assets/robot_5.png'),
    imagen: [require('./../../assets/p5.jpg'),
      require('./../../assets/p5_2.png'),
    ],
    nombre: "Marvin",
    descripcion: "Hermosa Especie",
    likes: 8000,
    comentarios: 1,
    compartidos: 0,
    location: "San Miguel de Tucumán, Tucumán",
    time: "10 h"
  }


];

const Post = () => {
  return (
    <View style={{ marginTop: 8 }}>
      {publicaciones.map(post => (
        <PostItem key={post.id} item={post} />
      ))}
    </View>
  );
};

const PostItem = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(typeof item.likes === 'number' ? item.likes : 0);

  // animación corazón grande (doble tap)
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // contador de imagen (fade-in/out)
  const counterOpacity = useRef(new Animated.Value(0)).current;
  const counterTimer = useRef(null);

  // para detectar doble tap
  const lastTap = useRef(null);

  // estado del índice del carrusel
  const [index, setIndex] = useState(0);

  // --- Normalizar / validar las fuentes de imagen ---
  const isValidSource = (src) => {
    return typeof src === 'number' || (src && typeof src === 'object' && typeof src.uri === 'string');
  };

  const buildImagesArray = () => {
    if (Array.isArray(item.imagen)) {
      const arr = item.imagen.filter(Boolean).filter(isValidSource);
      if (arr.length) return arr;
    }
    if (item.imagen && isValidSource(item.imagen)) {
      return [item.imagen];
    }
    if (Array.isArray(item.imagenes)) {
      const arr = item.imagenes.filter(Boolean).filter(isValidSource);
      if (arr.length) return arr;
    }
    if (item.profile && isValidSource(item.profile)) {
      return [item.profile];
    }
    return [];
  };

  const images = buildImagesArray();

  const animateHeart = () => {
    opacityAnim.setValue(1);
    scaleAnim.setValue(0.3);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.4, duration: 180, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.0, duration: 120, useNativeDriver: true }),
      Animated.delay(300),
      Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    }
  };

  const onImagePress = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      // doble tap detectado
      if (!liked) {
        setLiked(true);
        setLikeCount(prev => prev + 1);
      }
      animateHeart();
      // mostrar contador al hacer doble tap también (opcional)
      showImageCounter();
    } else {
      lastTap.current = now;
    }
  };

  // mostrar contador (fade-in) y programar fade-out en 6s
  const showImageCounter = () => {
    // sólo si hay más de 1 imagen
    if (images.length <= 1) return;

    // limpiar timer previo
    if (counterTimer.current) {
      clearTimeout(counterTimer.current);
      counterTimer.current = null;
    }

    // fade in
    Animated.timing(counterOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();

    // programar fade out
    counterTimer.current = setTimeout(() => {
      Animated.timing(counterOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
      counterTimer.current = null;
    }, 6000);
  };

  // cuando termina el scroll (snap), actualizamos index y mostramos contador
  const onMomentumScrollEnd = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
    showImageCounter();
  };

  // mostrar contador la primera vez si hay varias imágenes
  useEffect(() => {
    if (images.length > 1) {
      showImageCounter();
    }
    return () => {
      // cleanup timer al desmontar
      if (counterTimer.current) {
        clearTimeout(counterTimer.current);
        counterTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.postContainer}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image style={styles.profileImage} source={item.profile} />
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nameText}>{item.nombre}</Text>

              {item.verificado && (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#1DA1F2"
                  style={{ marginLeft: 5 }}
                />
              )}
            </View>

            <Text style={styles.locationText}>
              {item.location ? `${item.location} • ` : ''}{item.time ?? ''}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* --- CARRUSEL DE IMAGENES (FlatList horizontal) --- */}
      <View style={{ position: 'relative', width, height: 320 }}>
        <FlatList
          data={images}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          renderItem={({ item: image }) => (
            <TouchableWithoutFeedback onPress={onImagePress}>
              <View style={{ width, height: 320 }}>
                <Image style={[styles.postImage, { width, height: 320 }]} source={image} resizeMode="cover" />
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        {/* CONTADOR X / Y (fade-in) — arriba a la derecha sobre la imagen */}
        {images.length > 1 && (
          <Animated.View style={[
            styles.imageCounterContainer,
            { opacity: counterOpacity }
          ]}>
            <Text style={styles.imageCounterText}>{index + 1}/{images.length}</Text>
          </Animated.View>
        )}

        {/* corazón grande animado, sobre la imagen */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.centerHeart,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }
          ]}
        >
          <Ionicons name="heart" size={120} color="white" style={{ textShadowColor: 'rgba(0,0,0,0.6)', textShadowRadius: 10 }} />
        </Animated.View>
      </View>

      {/* PUNTOS DEL CARRUSEL, 1 imagen */}
      {images.length > 1 && (
        <View style={styles.dotsContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: index === i ? "#167cc0ff" : "#c7c6c6ff",
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* ICONOS CON CONTADORES */}
      <View style={styles.iconRow}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.iconWithCount} onPress={handleLike}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={26} color={liked ? "red" : "black"} />
            <Text style={styles.countText}>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWithCount}>
            <Ionicons name="chatbubble-outline" size={26} color="black" />
            <Text style={styles.countText}>{item.comentarios ?? 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWithCount}>
            <Feather name="repeat" size={24} color="black" />
            <Text style={styles.countText}>{item.compartidos ?? 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Ionicons name="paper-plane-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => setSaved(!saved)}>
            <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* LIKES Y DESCRIPCION */}
      <Text style={styles.likesText}>{likeCount} Me gusta</Text>

      {item.descripcion && (
        <Text style={styles.descriptionText}>
          <Text style={styles.nameText}>{item.nombre} </Text>
          {item.descripcion}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: { marginBottom: 30, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { height: 36, width: 36, borderRadius: 18 },
  nameText: { fontWeight: '700', fontSize: 14, color: '#111' },
  locationText: { fontSize: 12, color: '#666' },
  menuButton: { padding: 6 },

  postImage: { backgroundColor: '#eee' },

  centerHeart: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -60,
    marginTop: -60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconRow: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  iconWithCount: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  countText: { marginLeft: 6, fontSize: 13, color: '#111' },

  likesText: { marginLeft: 12, fontWeight: '700', marginTop: 4 },
  descriptionText: { paddingHorizontal: 12, marginTop: 6, color: '#111' },

  /* Dots */
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 1.5,
  },

  /* contador X/Y arriba-derecha (fade-in) */
  imageCounterContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 20,
  },
  imageCounterText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default Post;
