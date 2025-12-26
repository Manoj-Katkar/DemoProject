// // ReelsScreen

// import { Ionicons } from "@expo/vector-icons";
// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
// import React, { memo, useCallback, useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
//   ViewToken,
// } from "react-native";

// const { height, width } = Dimensions.get("window");

// interface ReelData {
//   id: string;
//   video: string;
//   userName: string;
//   caption: string;
//   likes: number;
//   comments: number;
//   profilePic: string;
// }

// const reelsData: ReelData[] = [
//   {
//     id: "1",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//     userName: "john_doe",
//     caption: "Enjoying the sunset 🌅",
//     likes: 243,
//     comments: 21,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "2",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//     userName: "alex_smith",
//     caption: "This place is magical ✨",
//     likes: 187,
//     comments: 14,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "3",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//     userName: "travel_with_me",
//     caption: "Wanderlust vibes 🌍",
//     likes: 355,
//     comments: 45,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "4",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//     userName: "wanderer",
//     caption: "Let's ride 🛵",
//     likes: 120,
//     comments: 10,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "5",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//     userName: "escape_artist",
//     caption: "Break free",
//     likes: 98,
//     comments: 8,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "6",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//     userName: "fun_time",
//     caption: "Good times ahead",
//     likes: 210,
//     comments: 19,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "7",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
//     userName: "adventure_seeker",
//     caption: "In motion",
//     likes: 320,
//     comments: 38,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "8",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
//     userName: "future_dreamer",
//     caption: "Eyes on tomorrow",
//     likes: 142,
//     comments: 16,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "9",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
//     userName: "road_trip",
//     caption: "Open road ahead",
//     likes: 56,
//     comments: 5,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "10",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
//     userName: "auto_lover",
//     caption: "Speed & style",
//     likes: 77,
//     comments: 12,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
// ];

// interface VideoItemProps {
//   item: ReelData;
//   isActive: boolean;
//   onLikePress: (id: string) => void;
//   onCommentPress: (id: string) => void;
//   onSharePress: (id: string) => void;
//   isLiked: boolean;
// }

// const VideoItem = memo(({
//   item,
//   isActive,
//   onLikePress,
//   onCommentPress,
//   onSharePress,
//   isLiked,
// }: VideoItemProps) => {
//   const videoRef = useRef<Video>(null);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const lastTap = useRef<number | null>(null);
//   const likeAnimation = useRef(new Animated.Value(0)).current;

//   const handleDoubleTap = useCallback(() => {
//     const now = Date.now();
//     const DOUBLE_TAP_DELAY = 300;

//     if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
//       // Double tap detected
//       onLikePress(item.id);
      
//       // Animate heart
//       likeAnimation.setValue(0);
//       Animated.sequence([
//         Animated.spring(likeAnimation, {
//           toValue: 1,
//           useNativeDriver: true,
//           friction: 3,
//         }),
//         Animated.delay(500),
//         Animated.timing(likeAnimation, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       lastTap.current = now;
//     }
//   }, [item.id, onLikePress, likeAnimation]);

//   const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
//     if (status.isLoaded) {
//       const currentProgress = status.positionMillis / status.durationMillis;
//       setProgress(currentProgress);
//       if (duration === 0 && status.durationMillis) {
//         setDuration(status.durationMillis);
//       }
//     }
//   }, [duration]);

//   useEffect(() => {
//     if (!isActive) {
//       setProgress(0);
//     }
//   }, [isActive]);

//   const heartScale = likeAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//   });

//   const heartOpacity = likeAnimation.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0, 1, 0],
//   });

//   return (
//     <View style={styles.videoContainer}>
//       <TouchableWithoutFeedback onPress={handleDoubleTap}>
//         <View style={styles.videoWrapper}>
//           <Video
//             ref={videoRef}
//             source={{ uri: item.video }}
//             style={styles.video}
//             resizeMode={ResizeMode.COVER}
//             shouldPlay={isActive}
//             isLooping
//             isMuted={false}
//             onPlaybackStatusUpdate={onPlaybackStatusUpdate}
//             onError={(e) => console.log("Video error:", e)}
//           />

//           {/* Double Tap Heart Animation */}
//           <Animated.View
//             style={[
//               styles.doubleTapHeart,
//               {
//                 opacity: heartOpacity,
//                 transform: [{ scale: heartScale }],
//               },
//             ]}
//           >
//             <Ionicons name="heart" size={100} color="#fff" />
//           </Animated.View>

//           {/* Progress Bar */}
//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBarBackground}>
//               <View
//                 style={[
//                   styles.progressBarFill,
//                   { width: `${progress * 100}%` },
//                 ]}
//               />
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>

//       {/* Overlay UI */}
//       <View style={styles.overlayContainer}>
//         {/* Left Bottom Info */}
//         <View style={styles.bottomInfo}>
//           <View style={styles.userRow}>
//             <Image source={{ uri: item.profilePic }} style={styles.avatar} />
//             <Text style={styles.userName}>@{item.userName}</Text>
//           </View>
//           <Text style={styles.caption}>{item.caption}</Text>
//         </View>

//         {/* Right Side Action Buttons */}
//         <View style={styles.rightActions}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => onLikePress(item.id)}
//           >
//             <Ionicons
//               name={isLiked ? "heart" : "heart-outline"}
//               size={30}
//               color={isLiked ? "#ff3b30" : "#fff"}
//             />
//             <Text style={styles.actionLabel}>{item.likes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => onCommentPress(item.id)}
//           >
//             <Ionicons name="chatbubble-outline" size={28} color="#fff" />
//             <Text style={styles.actionLabel}>{item.comments}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => onSharePress(item.id)}
//           >
//             <Ionicons name="share-outline" size={28} color="#fff" />
//             <Text style={styles.actionLabel}>Share</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={[styles.actionButton, { marginTop: 10 }]}>
//             <Image source={{ uri: item.profilePic }} style={styles.musicThumb} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// });
// VideoItem.displayName = "VideoItem";

// export default function ReelsScreen() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

//   const viewabilityConfig = useRef({
//     viewAreaCoveragePercentThreshold: 50,
//     minimumViewTime: 300,
//   }).current;

//   const onViewableItemsChanged = useRef(
//     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//       if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//         setCurrentIndex(viewableItems[0].index);
//       }
//     }
//   ).current;

//   const handleLikePress = useCallback((id: string) => {
//     setLikedVideos((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   }, []);

//   const handleCommentPress = useCallback((id: string) => {
//     console.log("Comment pressed for:", id);
//     // Add your comment modal/screen navigation here
//   }, []);

//   const handleSharePress = useCallback((id: string) => {
//     console.log("Share pressed for:", id);
//     // Add your share functionality here
//   }, []);

//   const renderItem = useCallback(
//     ({ item, index }: { item: ReelData; index: number }) => (
//       <VideoItem
//         item={item}
//         isActive={currentIndex === index}
//         onLikePress={handleLikePress}
//         onCommentPress={handleCommentPress}
//         onSharePress={handleSharePress}
//         isLiked={likedVideos.has(item.id)}
//       />
//     ),
//     [currentIndex, handleLikePress, handleCommentPress, handleSharePress, likedVideos]
//   );

//   const keyExtractor = useCallback((item: ReelData) => item.id, []);

//   const getItemLayout = useCallback(
//     (_: any, index: number) => ({
//       length: height,
//       offset: height * index,
//       index,
//     }),
//     []
//   );

//   return (
//     <FlatList
//       data={reelsData}
//       renderItem={renderItem}
//       keyExtractor={keyExtractor}
//       pagingEnabled
//       decelerationRate="fast"
//       snapToInterval={height}
//       snapToAlignment="start"
//       showsVerticalScrollIndicator={false}
//       onViewableItemsChanged={onViewableItemsChanged}
//       viewabilityConfig={viewabilityConfig}
//       getItemLayout={getItemLayout}
//       maxToRenderPerBatch={2}
//       windowSize={5}
//       initialNumToRender={2}
//       removeClippedSubviews
//       updateCellsBatchingPeriod={100}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   videoContainer: {
//     height,
//     width,
//     backgroundColor: "#000",
//   },
//   videoWrapper: {
//     flex: 1,
//   },
//   video: {
//     height: "100%",
//     width: "100%",
//   },
//   doubleTapHeart: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -50,
//     marginTop: -50,
//     zIndex: 10,
//   },
//   progressBarContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     zIndex: 5,
//   },
//   progressBarBackground: {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//   },
//   progressBarFill: {
//     height: "100%",
//     backgroundColor: "#fff",
//   },
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     pointerEvents: "box-none",
//   },
//   bottomInfo: {
//     position: "absolute",
//     bottom: 80,
//     left: 16,
//     width: width * 0.65,
//   },
//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   avatar: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#fff",
//     marginRight: 10,
//   },
//   userName: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   caption: {
//     color: "#fff",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   rightActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 100,
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   actionLabel: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//   },
//   musicThumb: {
//     height: 36,
//     width: 36,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     borderColor: "#fff",
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
// import React, { memo, useCallback, useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   Image,
//   PanResponder,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
//   ViewToken,
// } from "react-native";

// const { height, width } = Dimensions.get("window");
// const BOTTOM_TAB_HEIGHT = 60; // Adjust this based on your bottom tab height

// const reelsData = [
//   {
//     id: "1",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//     userName: "john_doe",
//     caption: "Enjoying the sunset 🌅",
//     likes: 243,
//     comments: 21,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "2",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//     userName: "alex_smith",
//     caption: "This place is magical ✨",
//     likes: 187,
//     comments: 14,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "3",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//     userName: "travel_with_me",
//     caption: "Wanderlust vibes 🌍",
//     likes: 355,
//     comments: 45,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "4",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//     userName: "wanderer",
//     caption: "Let's ride 🛵",
//     likes: 120,
//     comments: 10,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "5",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//     userName: "escape_artist",
//     caption: "Break free",
//     likes: 98,
//     comments: 8,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "6",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//     userName: "fun_time",
//     caption: "Good times ahead",
//     likes: 210,
//     comments: 19,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "7",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
//     userName: "adventure_seeker",
//     caption: "In motion",
//     likes: 320,
//     comments: 38,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
//   {
//     id: "8",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
//     userName: "future_dreamer",
//     caption: "Eyes on tomorrow",
//     likes: 142,
//     comments: 16,
//     profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//   },
//   {
//     id: "9",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
//     userName: "road_trip",
//     caption: "Open road ahead",
//     likes: 56,
//     comments: 5,
//     profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//   },
//   {
//     id: "10",
//     video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
//     userName: "auto_lover",
//     caption: "Speed & style",
//     likes: 77,
//     comments: 12,
//     profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//   },
// ];

// const VideoItem = memo(
//   ({
//     item,
//     isActive,
//     onLike,
//     onComment,
//     onShare,
//     isLiked,
//     currentLikes,
//   }: {
//     item: any;
//     isActive: boolean;
//     onLike: () => void;
//     onComment: () => void;
//     onShare: () => void;
//     isLiked: boolean;
//     currentLikes: number;
//   }) => {
//     const videoRef = useRef<Video>(null);
//     const [progress, setProgress] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [isSeeking, setIsSeeking] = useState(false);

//     // Double tap animation
//     const scaleAnim = useRef(new Animated.Value(0)).current;
//     const opacityAnim = useRef(new Animated.Value(0)).current;
//     const pauseOpacityAnim = useRef(new Animated.Value(0)).current;
//     const lastTap = useRef<number | null>(null);

//     const handleTap = async () => {
//       const now = Date.now();
//       const DOUBLE_TAP_DELAY = 300;

//       if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
//         // Double tap detected - Like the video
//         onLike();

//         // Animate heart
//         scaleAnim.setValue(0);
//         opacityAnim.setValue(1);

//         Animated.parallel([
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacityAnim, {
//             toValue: 0,
//             duration: 800,
//             delay: 200,
//             useNativeDriver: true,
//           }),
//         ]).start();

//         lastTap.current = null;
//       } else {
//         // Single tap detected - Play/Pause
//         lastTap.current = now;

//         setTimeout(async () => {
//           if (lastTap.current === now) {
//             // Still a single tap after delay
//             if (videoRef.current) {
//               const status = await videoRef.current.getStatusAsync();
//               if (status.isLoaded) {
//                 if (status.isPlaying) {
//                   await videoRef.current.pauseAsync();
//                   setIsPlaying(false);
                  
//                   // Show pause icon
//                   pauseOpacityAnim.setValue(1);
//                   Animated.timing(pauseOpacityAnim, {
//                     toValue: 0,
//                     duration: 500,
//                     delay: 300,
//                     useNativeDriver: true,
//                   }).start();
//                 } else {
//                   await videoRef.current.playAsync();
//                   setIsPlaying(true);
                  
//                   // Show play icon
//                   pauseOpacityAnim.setValue(1);
//                   Animated.timing(pauseOpacityAnim, {
//                     toValue: 0,
//                     duration: 500,
//                     delay: 300,
//                     useNativeDriver: true,
//                   }).start();
//                 }
//               }
//             }
//           }
//         }, DOUBLE_TAP_DELAY);
//       }
//     };

//     const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
//       if (status.isLoaded && !isSeeking) {
//         const progressValue = status.positionMillis / status.durationMillis;
//         setProgress(progressValue || 0);
//         if (status.durationMillis) {
//           setDuration(status.durationMillis);
//         }
//         setIsPlaying(status.isPlaying);
//       }
//     };

//     const handleSeek = async (seekProgress: number) => {
//       if (videoRef.current && duration > 0) {
//         const seekPosition = seekProgress * duration;
//         await videoRef.current.setPositionAsync(seekPosition);
//         setProgress(seekProgress);
//       }
//     };

//     const panResponder = useRef(
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onMoveShouldSetPanResponder: () => true,
//         onPanResponderGrant: () => {
//           setIsSeeking(true);
//         },
//         onPanResponderMove: (_, gestureState) => {
//           const seekBarWidth = width - 32; // accounting for padding
//           const newProgress = Math.max(
//             0,
//             Math.min(1, gestureState.moveX / seekBarWidth)
//           );
//           setProgress(newProgress);
//         },
//         onPanResponderRelease: (_, gestureState) => {
//           const seekBarWidth = width - 32;
//           const newProgress = Math.max(
//             0,
//             Math.min(1, gestureState.moveX / seekBarWidth)
//           );
//           handleSeek(newProgress);
//           setIsSeeking(false);
//         },
//       })
//     ).current;

//     const formatTime = (millis: number) => {
//       const totalSeconds = Math.floor(millis / 1000);
//       const minutes = Math.floor(totalSeconds / 60);
//       const seconds = totalSeconds % 60;
//       return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//     };

//     // Reset play state when video becomes active/inactive
//     React.useEffect(() => {
//       if (isActive) {
//         setIsPlaying(true);
//       } else {
//         setIsPlaying(false);
//       }
//     }, [isActive]);

//     return (
//       <View style={styles.videoContainer}>
//         <TouchableWithoutFeedback onPress={handleTap}>
//           <View style={styles.video}>
//             <Video
//               ref={videoRef}
//               source={{ uri: item.video }}
//               style={styles.video}
//               resizeMode={ResizeMode.COVER}
//               shouldPlay={isActive && isPlaying}
//               isLooping
//               isMuted={false}
//               onPlaybackStatusUpdate={onPlaybackStatusUpdate}
//               onError={(e) => console.log("Video error:", e)}
//             />
//           </View>
//         </TouchableWithoutFeedback>

//         {/* Double Tap Heart Animation */}
//         <Animated.View
//           style={[
//             styles.doubleTapHeart,
//             {
//               opacity: opacityAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//           pointerEvents="none"
//         >
//           <Ionicons name="heart" size={100} color="#fff" />
//         </Animated.View>

//         {/* Play/Pause Icon Animation */}
//         <Animated.View
//           style={[
//             styles.playPauseIcon,
//             {
//               opacity: pauseOpacityAnim,
//             },
//           ]}
//           pointerEvents="none"
//         >
//           <Ionicons
//             name={isPlaying ? "play" : "pause"}
//             size={80}
//             color="#fff"
//           />
//         </Animated.View>

//         {/* Seekable Progress Bar at Bottom */}
//         <View style={styles.seekBarContainer}>
//           <View style={styles.timeContainer}>
//             <Text style={styles.timeText}>
//               {formatTime(progress * duration)} / {formatTime(duration)}
//             </Text>
//           </View>
//           <View style={styles.seekBarWrapper} {...panResponder.panHandlers}>
//             <View style={styles.seekBarBackground}>
//               <View
//                 style={[
//                   styles.seekBarFill,
//                   { width: `${progress * 100}%` },
//                 ]}
//               />
//               <View
//                 style={[
//                   styles.seekBarThumb,
//                   { left: `${progress * 100}%` },
//                 ]}
//               />
//             </View>
//           </View>
//         </View>

//         {/* Overlay UI */}
//         <View style={styles.overlayContainer} pointerEvents="box-none">
//           {/* Left Bottom Info */}
//           <View style={styles.bottomInfo}>
//             <View style={styles.userRow}>
//               <Image source={{ uri: item.profilePic }} style={styles.avatar} />
//               <Text style={styles.userName}>@{item.userName}</Text>
//             </View>
//             <Text style={styles.caption}>{item.caption}</Text>
//           </View>

//           {/* Right Side Action Buttons */}
//           <View style={styles.rightActions}>
//             <TouchableOpacity style={styles.actionButton} onPress={onLike}>
//               <Ionicons
//                 name={isLiked ? "heart" : "heart-outline"}
//                 size={30}
//                 color={isLiked ? "#ff3b30" : "#fff"}
//               />
//               <Text style={styles.actionLabel}>{currentLikes}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionButton} onPress={onComment}>
//               <Ionicons name="chatbubble-outline" size={28} color="#fff" />
//               <Text style={styles.actionLabel}>{item.comments}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionButton} onPress={onShare}>
//               <Ionicons name="share-outline" size={28} color="#fff" />
//               <Text style={styles.actionLabel}>Share</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionButton, { marginTop: 10 }]}>
//               <Image
//                 source={{ uri: item.profilePic }}
//                 style={styles.musicThumb}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// );
// VideoItem.displayName = "VideoItem";

// export default function ReelsScreen() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
//     {}
//   );
//   const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>(
//     () => {
//       const initialLikes: { [key: string]: number } = {};
//       reelsData.forEach((item) => {
//         initialLikes[item.id] = item.likes;
//       });
//       return initialLikes;
//     }
//   );

//   const viewabilityConfig = useRef({
//     viewAreaCoveragePercentThreshold: 80,
//   }).current;

//   const onViewableItemsChanged = useRef(
//     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//       if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//         setCurrentIndex(viewableItems[0].index);
//       }
//     }
//   ).current;

//   const handleLike = useCallback((itemId: string) => {
//     setLikedVideos((prev) => {
//       const isCurrentlyLiked = prev[itemId];
//       const newLikedState = !isCurrentlyLiked;

//       // Update like count
//       setLikeCounts((prevCounts) => ({
//         ...prevCounts,
//         [itemId]: newLikedState
//           ? prevCounts[itemId] + 1
//           : prevCounts[itemId] - 1,
//       }));

//       return {
//         ...prev,
//         [itemId]: newLikedState,
//       };
//     });
//   }, []);

//   const handleComment = useCallback((item: any) => {
//     Alert.alert(
//       "Comments",
//       `View ${item.comments} comments for ${item.userName}'s post`,
//       [
//         {
//           text: "Add Comment",
//           onPress: () => console.log("Add comment pressed"),
//         },
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//       ]
//     );
//   }, []);

//   const handleShare = useCallback((item: any) => {
//     Alert.alert("Share", `Share ${item.userName}'s reel`, [
//       {
//         text: "Share to Instagram",
//         onPress: () => console.log("Share to Instagram"),
//       },
//       {
//         text: "Share to WhatsApp",
//         onPress: () => console.log("Share to WhatsApp"),
//       },
//       {
//         text: "Copy Link",
//         onPress: () => console.log("Link copied"),
//       },
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//     ]);
//   }, []);

//   const renderItem = useCallback(
//     ({ item, index }: { item: any; index: number }) => (
//       <VideoItem
//         item={item}
//         isActive={currentIndex === index}
//         onLike={() => handleLike(item.id)}
//         onComment={() => handleComment(item)}
//         onShare={() => handleShare(item)}
//         isLiked={likedVideos[item.id] || false}
//         currentLikes={likeCounts[item.id]}
//       />
//     ),
//     [
//       currentIndex,
//       likedVideos,
//       likeCounts,
//       handleLike,
//       handleComment,
//       handleShare,
//     ]
//   );

//   return (
//     <FlatList
//       data={reelsData}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//       pagingEnabled
//       decelerationRate="fast"
//       snapToInterval={height - BOTTOM_TAB_HEIGHT}
//       snapToAlignment="start"
//       showsVerticalScrollIndicator={false}
//       onViewableItemsChanged={onViewableItemsChanged}
//       viewabilityConfig={viewabilityConfig}
//       getItemLayout={(_, index) => ({
//         length: height - BOTTOM_TAB_HEIGHT,
//         offset: (height - BOTTOM_TAB_HEIGHT) * index,
//         index,
//       })}
//       windowSize={3}
//       initialNumToRender={2}
//       removeClippedSubviews
//       contentContainerStyle={{ paddingBottom: BOTTOM_TAB_HEIGHT }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   videoContainer: {
//     height: height - BOTTOM_TAB_HEIGHT -20,
//     width,
//     backgroundColor: "#000",
//     // backgroundColor: "black",
//     // opacity: 0.1, // Fixes video rendering issue on some devices
//     marginTop: 10,

//   },
//   video: {
//     height: "100%",
//     width: "100%",
//   },
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     pointerEvents: "box-none",
//     // backgroundColor:"yellow"
//   },
//   bottomInfo: {
//     position: "absolute",
//     bottom: 70,
//     left: 16,
//     width: width * 0.65,
//     // backgroundColor:"yellow"

//   },
//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   avatar: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#fff",
//     marginRight: 10,
//   },
//   userName: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   caption: {
//     color: "#fff",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   rightActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 30,
//     alignItems: "center",
//     // backgroundColor:"yellow"
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   actionLabel: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: "600",
//   },
//   musicThumb: {
//     height: 36,
//     width: 36,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     borderColor: "#fff",
//   },
//   doubleTapHeart: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -50,
//     marginTop: -50,
//     zIndex: 10,
//     // backgroundColor:"yellow"
//   },
//   playPauseIcon: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -40,
//     marginTop: -40,
//     zIndex: 10,
//   },
//   seekBarContainer: {
//     position: "absolute",
//     bottom: 10,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     zIndex: 5,
//     // backgroundColor:"yellow"
//   },
//   timeContainer: {
//     marginBottom: 4,
//   },
//   timeText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   seekBarWrapper: {
//     height: 30,
//     justifyContent: "center",
//   },
//   seekBarBackground: {
//     height: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     borderRadius: 2,
//     position: "relative",
//   },
//   seekBarFill: {
//     height: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 2,
//   },
//   seekBarThumb: {
//     position: "absolute",
//     top: -6,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     marginLeft: -8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
// });


// third 
// import { Ionicons } from "@expo/vector-icons";
// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
// import React, { memo, useCallback, useRef, useState } from "react";
// import {
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
//   ViewToken,
// } from "react-native";

// const { height, width } = Dimensions.get("window");
// const BOTTOM_TAB_HEIGHT = 60;

// // Generate 1000 reels data
// const generateReelsData = (count: number) => {
//   const baseData = [
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//       userName: "john_doe",
//       caption: "Enjoying the sunset 🌅",
//       likes: 243,
//       comments: 21,
//       profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//       userName: "alex_smith",
//       caption: "This place is magical ✨",
//       likes: 187,
//       comments: 14,
//       profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//       userName: "travel_with_me",
//       caption: "Wanderlust vibes 🌍",
//       likes: 355,
//       comments: 45,
//       profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
//       userName: "wanderer",
//       caption: "Let's ride 🛵",
//       likes: 120,
//       comments: 10,
//       profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//       userName: "escape_artist",
//       caption: "Break free",
//       likes: 98,
//       comments: 8,
//       profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//       userName: "fun_time",
//       caption: "Good times ahead",
//       likes: 210,
//       comments: 19,
//       profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
//       userName: "adventure_seeker",
//       caption: "In motion",
//       likes: 320,
//       comments: 38,
//       profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
//       userName: "future_dreamer",
//       caption: "Eyes on tomorrow",
//       likes: 142,
//       comments: 16,
//       profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
//       userName: "road_trip",
//       caption: "Open road ahead",
//       likes: 56,
//       comments: 5,
//       profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//     },
//     {
//       video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
//       userName: "auto_lover",
//       caption: "Speed & style",
//       likes: 77,
//       comments: 12,
//       profilePic: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=100",
//     },
//   ];

//   const reels = [];
//   for (let i = 0; i < count; i++) {
//     const baseItem = baseData[i % baseData.length];
//     reels.push({
//       id: String(i + 1),
//       ...baseItem,
//       userName: `${baseItem.userName}_${i + 1}`,
//       likes: Math.floor(Math.random() * 1000) + 50,
//       comments: Math.floor(Math.random() * 100) + 5,
//     });
//   }
//   return reels;
// };

// const reelsData = generateReelsData(1000);

// const VideoItem = memo(
//   ({
//     item,
//     isActive,
//     onLike,
//     onComment,
//     onShare,
//     isLiked,
//     currentLikes,
//   }: {
//     item: any;
//     isActive: boolean;
//     onLike: () => void;
//     onComment: () => void;
//     onShare: () => void;
//     isLiked: boolean;
//     currentLikes: number;
//   }) => {
//     const videoRef = useRef<Video>(null);
//     const [progress, setProgress] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [isSeeking, setIsSeeking] = useState(false);
//     const seekBarRef = useRef<View>(null);

//     // Double tap animation
//     const scaleAnim = useRef(new Animated.Value(0)).current;
//     const opacityAnim = useRef(new Animated.Value(0)).current;
//     const pauseOpacityAnim = useRef(new Animated.Value(0)).current;
//     const lastTap = useRef<number | null>(null);

//     const handleTap = async () => {
//       const now = Date.now();
//       const DOUBLE_TAP_DELAY = 300;

//       if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
//         // Double tap detected - Like the video
//         onLike();

//         // Animate heart
//         scaleAnim.setValue(0);
//         opacityAnim.setValue(1);

//         Animated.parallel([
//           Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacityAnim, {
//             toValue: 0,
//             duration: 800,
//             delay: 200,
//             useNativeDriver: true,
//           }),
//         ]).start();

//         lastTap.current = null;
//       } else {
//         // Single tap detected - Play/Pause
//         lastTap.current = now;

//         setTimeout(async () => {
//           if (lastTap.current === now) {
//             // Still a single tap after delay
//             if (videoRef.current) {
//               const status = await videoRef.current.getStatusAsync();
//               if (status.isLoaded) {
//                 if (status.isPlaying) {
//                   await videoRef.current.pauseAsync();
//                   setIsPlaying(false);

//                   // Show pause icon
//                   pauseOpacityAnim.setValue(1);
//                   Animated.timing(pauseOpacityAnim, {
//                     toValue: 0,
//                     duration: 500,
//                     delay: 300,
//                     useNativeDriver: true,
//                   }).start();
//                 } else {
//                   await videoRef.current.playAsync();
//                   setIsPlaying(true);

//                   // Show play icon
//                   pauseOpacityAnim.setValue(1);
//                   Animated.timing(pauseOpacityAnim, {
//                     toValue: 0,
//                     duration: 500,
//                     delay: 300,
//                     useNativeDriver: true,
//                   }).start();
//                 }
//               }
//             }
//           }
//         }, DOUBLE_TAP_DELAY);
//       }
//     };

//     const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
//       if (status.isLoaded && !isSeeking) {
//         const progressValue = status.positionMillis / status.durationMillis;
//         setProgress(progressValue || 0);
//         if (status.durationMillis) {
//           setDuration(status.durationMillis);
//         }
//         setIsPlaying(status.isPlaying);
//       }
//     };

//     const handleSeek = async (seekProgress: number) => {
//       if (videoRef.current && duration > 0) {
//         const seekPosition = seekProgress * duration;
//         try {
//           await videoRef.current.setPositionAsync(seekPosition);
//           setProgress(seekProgress);
//         } catch (error) {
//           console.log("Seek error:", error);
//         }
//       }
//     };

//     const handleSeekBarTouch = (event: any) => {
//       setIsSeeking(true);
      
//       // Get the touch position relative to the seek bar
//       seekBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
//         const touchX = event.nativeEvent.pageX - pageX;
//         const newProgress = Math.max(0, Math.min(1, touchX / width));
//         setProgress(newProgress);
//         handleSeek(newProgress);
//       });

//       setTimeout(() => {
//         setIsSeeking(false);
//       }, 100);
//     };

//     const formatTime = (millis: number) => {
//       if (!millis || isNaN(millis)) return "0:00";
//       const totalSeconds = Math.floor(millis / 1000);
//       const minutes = Math.floor(totalSeconds / 60);
//       const seconds = totalSeconds % 60;
//       return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//     };

//     // Reset play state when video becomes active/inactive
//     React.useEffect(() => {
//       if (isActive) {
//         setIsPlaying(true);
//         setProgress(0); // Reset progress when video becomes active
//       } else {
//         setIsPlaying(false);
//       }
//     }, [isActive]);

//     return (
//       <View style={styles.videoContainer}>
//         <TouchableWithoutFeedback onPress={handleTap}>
//           <View style={styles.video}>
//             <Video
//               ref={videoRef}
//               source={{ uri: item.video }}
//               style={styles.video}
//               resizeMode={ResizeMode.COVER}
//               shouldPlay={isActive && isPlaying}
//               isLooping
//               isMuted={false}
//               onPlaybackStatusUpdate={onPlaybackStatusUpdate}
//               onError={(e) => console.log("Video error:", e)}
//             />
//           </View>
//         </TouchableWithoutFeedback>

//         {/* Double Tap Heart Animation */}
//         <Animated.View
//           style={[
//             styles.doubleTapHeart,
//             {
//               opacity: opacityAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//           pointerEvents="none"
//         >
//           <Ionicons name="heart" size={100} color="#fff" />
//         </Animated.View>

//         {/* Play/Pause Icon Animation */}
//         <Animated.View
//           style={[
//             styles.playPauseIcon,
//             {
//               opacity: pauseOpacityAnim,
//             },
//           ]}
//           pointerEvents="none"
//         >
//           <Ionicons
//             name={isPlaying ? "play" : "pause"}
//             size={80}
//             color="#fff"
//           />
//         </Animated.View>

//         {/* Seekable Progress Bar at Bottom */}
//         <View style={styles.seekBarContainer}>
//           <View style={styles.timeContainer}>
//             <Text style={styles.timeText}>
//               {formatTime(progress * duration)} / {formatTime(duration)}
//             </Text>
//           </View>
//           <TouchableWithoutFeedback onPress={handleSeekBarTouch}>
//             <View style={styles.seekBarWrapper} ref={seekBarRef}>
//               <View style={styles.seekBarBackground}>
//                 <View
//                   style={[
//                     styles.seekBarFill,
//                     { width: `${progress * 100}%` },
//                   ]}
//                 />
//                 <View
//                   style={[
//                     styles.seekBarThumb,
//                     { left: `${progress * 100}%` },
//                   ]}
//                 />
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>

//         {/* Overlay UI */}
//         <View style={styles.overlayContainer} pointerEvents="box-none">
//           {/* Left Bottom Info */}
//           <View style={styles.bottomInfo}>
//             <View style={styles.userRow}>
//               <Image source={{ uri: item.profilePic }} style={styles.avatar} />
//               <Text style={styles.userName}>@{item.userName}</Text>
//             </View>
//             <Text style={styles.caption} numberOfLines={2}>
//               {item.caption}
//             </Text>
//           </View>

//           {/* Right Side Action Buttons */}
//           <View style={styles.rightActions}>
//             <TouchableOpacity style={styles.actionButton} onPress={onLike}>
//               <Ionicons
//                 name={isLiked ? "heart" : "heart-outline"}
//                 size={30}
//                 color={isLiked ? "#ff3b30" : "#fff"}
//               />
//               <Text style={styles.actionLabel}>{currentLikes}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionButton} onPress={onComment}>
//               <Ionicons name="chatbubble-outline" size={28} color="#fff" />
//               <Text style={styles.actionLabel}>{item.comments}</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionButton} onPress={onShare}>
//               <Ionicons name="share-outline" size={28} color="#fff" />
//               <Text style={styles.actionLabel}>Share</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={[styles.actionButton, { marginTop: 10 }]}>
//               <Image
//                 source={{ uri: item.profilePic }}
//                 style={styles.musicThumb}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// );
// VideoItem.displayName = "VideoItem";

// export default function ReelsScreen() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(
//     {}
//   );
//   const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>(
//     () => {
//       const initialLikes: { [key: string]: number } = {};
//       reelsData.forEach((item) => {
//         initialLikes[item.id] = item.likes;
//       });
//       return initialLikes;
//     }
//   );

//   const viewabilityConfig = useRef({
//     viewAreaCoveragePercentThreshold: 80,
//   }).current;

//   const onViewableItemsChanged = useRef(
//     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//       if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//         setCurrentIndex(viewableItems[0].index);
//       }
//     }
//   ).current;

//   const handleLike = useCallback((itemId: string) => {
//     setLikedVideos((prev) => {
//       const isCurrentlyLiked = prev[itemId];
//       const newLikedState = !isCurrentlyLiked;

//       // Update like count
//       setLikeCounts((prevCounts) => ({
//         ...prevCounts,
//         [itemId]: newLikedState
//           ? prevCounts[itemId] + 1
//           : prevCounts[itemId] - 1,
//       }));

//       return {
//         ...prev,
//         [itemId]: newLikedState,
//       };
//     });
//   }, []);

//   const handleComment = useCallback((item: any) => {
//     Alert.alert(
//       "Comments",
//       `View ${item.comments} comments for ${item.userName}'s post`,
//       [
//         {
//           text: "Add Comment",
//           onPress: () => console.log("Add comment pressed"),
//         },
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//       ]
//     );
//   }, []);

//   const handleShare = useCallback((item: any) => {
//     Alert.alert("Share", `Share ${item.userName}'s reel`, [
//       {
//         text: "Share to Instagram",
//         onPress: () => console.log("Share to Instagram"),
//       },
//       {
//         text: "Share to WhatsApp",
//         onPress: () => console.log("Share to WhatsApp"),
//       },
//       {
//         text: "Copy Link",
//         onPress: () => console.log("Link copied"),
//       },
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//     ]);
//   }, []);

//   const renderItem = useCallback(
//     ({ item, index }: { item: any; index: number }) => (
//       <VideoItem
//         item={item}
//         isActive={currentIndex === index}
//         onLike={() => handleLike(item.id)}
//         onComment={() => handleComment(item)}
//         onShare={() => handleShare(item)}
//         isLiked={likedVideos[item.id] || false}
//         currentLikes={likeCounts[item.id]}
//       />
//     ),
//     [
//       currentIndex,
//       likedVideos,
//       likeCounts,
//       handleLike,
//       handleComment,
//       handleShare,
//     ]
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={reelsData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         pagingEnabled
//         decelerationRate="fast"
//         snapToInterval={height - BOTTOM_TAB_HEIGHT}
//         snapToAlignment="start"
//         showsVerticalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         getItemLayout={(_, index) => ({
//           length: height - BOTTOM_TAB_HEIGHT,
//           offset: (height - BOTTOM_TAB_HEIGHT) * index,
//           index,
//         })}
//         windowSize={5}
//         initialNumToRender={3}
//         maxToRenderPerBatch={5}
//         removeClippedSubviews
//         updateCellsBatchingPeriod={50}
//         contentContainerStyle={{ paddingBottom: BOTTOM_TAB_HEIGHT }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   videoContainer: {
//     height: height - BOTTOM_TAB_HEIGHT - 20,
//     width,
//     backgroundColor: "#000",
//     marginTop: 10,
//   },
//   video: {
//     height: "100%",
//     width: "100%",
//   },
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "flex-end",
//     pointerEvents: "box-none",
//   },
//   bottomInfo: {
//     position: "absolute",
//     bottom: 70,
//     left: 16,
//     width: width * 0.65,
//   },
//   userRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   avatar: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#fff",
//     marginRight: 10,
//   },
//   userName: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   caption: {
//     color: "#fff",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   rightActions: {
//     position: "absolute",
//     right: 16,
//     bottom: 30,
//     alignItems: "center",
//   },
//   actionButton: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   actionLabel: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: "600",
//   },
//   musicThumb: {
//     height: 36,
//     width: 36,
//     borderRadius: 18,
//     borderWidth: 1.5,
//     borderColor: "#fff",
//   },
//   doubleTapHeart: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -50,
//     marginTop: -50,
//     zIndex: 10,
//   },
//   playPauseIcon: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -40,
//     marginTop: -40,
//     zIndex: 10,
//   },
//   seekBarContainer: {
//     position: "absolute",
//     bottom: 10,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     zIndex: 5,
//     // backgroundColor:"yellow",
//     marginBottom:20,
//     // marginTop:5
//   },
//   timeContainer: {
//     marginBottom: 4,
//   },
//   timeText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   seekBarWrapper: {
//     height: 30,
//     justifyContent: "center",
//   },
//   seekBarBackground: {
//     height: 4,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     borderRadius: 2,
//     position: "relative",
//   },
//   seekBarFill: {
//     height: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 2,
//   },
//   seekBarThumb: {
//     position: "absolute",
//     top: -6,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     marginLeft: -8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
// });



// import React, { useState } from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';

// const index = () => {
//   const [form, setForm] = useState({
//     uploadedImage: '',
//   });

//   const handleBrowse = async () => {
//     try {
//       const image = await ImagePicker.openPicker({
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
//       console.log('Selected Image:', image);
//       setForm((prev) => ({ ...prev, uploadedImage: image.path }));
//     } catch (error) {
//       if (
//         error instanceof Error &&
//         error.message === 'User cancelled image selection'
//       ) {
//         console.log('Image selection was cancelled by the user.');
//       } else {
//         console.error('Error selecting image:', error);
//       }
//     }
//   };

//   const handleOpenCamera = async () => {
//     try {
//       const image = await ImagePicker.openCamera({
//         width: 300,
//         height: 400,
//         cropping: true,
//       });
//       setForm((prev) => ({ ...prev, uploadedImage: image.path }));
//     } catch (error) {
//       if (
//         error instanceof Error &&
//         error.message === 'User cancelled image selection'
//       ) {
//         console.log('Camera operation was cancelled by the user.');
//       } else {
//         console.error('Error capturing image:', error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Image Picker</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleBrowse}>
//           <Text style={styles.buttonText}>Open Gallery</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
//           <Text style={styles.buttonText}>Open Camera</Text>
//         </TouchableOpacity>
//       </View>

//       {form.uploadedImage ? (
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Selected Image:</Text>
//           <Image
//             source={{ uri: form.uploadedImage }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//         </View>
//       ) : (
//         <Text style={styles.placeholderText}>No image selected</Text>
//       )}
//     </View>
//   );
// };


import { ResizeMode, Video } from 'expo-av';
import * as ExpoImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';


const { width } = Dimensions.get('window');
const CARD_PADDING = 20;
const CARD_GAP = 16;

const index = () => {
  const [cropPickerImage, setCropPickerImage] = useState('');
  const [expoPickerImage, setExpoPickerImage] = useState('');
    const [cropPickerVideo, setCropPickerVideo] = useState('');
      // Video Picker handlers
  const handleCropPickerVideoCamera = async () => {
    try {
      const video = await ImagePicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'HighestQuality',
      });
      console.log('React Native Crop Picker - Video Camera:', video);
      setCropPickerVideo(video.path);
    } catch (error) {
      if (error instanceof Error && error.message === 'User cancelled image selection') {
        console.log('Video recording was cancelled by the user.');
      } else {
        console.error('Error recording video:', error);
      }
    }
  };

    const handleCropPickerVideoGallery = async () => {
    try {
      const video = await ImagePicker.openPicker({
        mediaType: 'video',
        compressVideoPreset: 'HighestQuality',
      });
      console.log('React Native Crop Picker - Video Gallery:', video);
      setCropPickerVideo(video.path);
    } catch (error) {
      if (error instanceof Error && error.message === 'User cancelled image selection') {
        console.log('Video selection was cancelled by the user.');
      } else {
        console.error('Error selecting video:', error);
      }
    }
  };

  // React Native Image Crop Picker handlers
  const handleCropPickerGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1920,
        height: 2560,
        cropping: true,
        compressImageQuality: 1,
        compressImageMaxWidth: 1920,
        compressImageMaxHeight: 2560,
      });
      console.log('React Native Crop Picker - Gallery:', image);
      setCropPickerImage(image.path);
    } catch (error) {
      if (error instanceof Error && error.message === 'User cancelled image selection') {
        console.log('Image selection was cancelled by the user.');
      } else {
        console.error('Error selecting image:', error);
      }
    }
  };

  const handleCropPickerCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 1920,
        height: 2560,
        cropping: true,
        compressImageQuality: 1,
        compressImageMaxWidth: 1920,
        compressImageMaxHeight: 2560,
        includeExif: true,
        forceJpg: false,
      });
      console.log('React Native Crop Picker - Camera:', image);
      setCropPickerImage(image.path);
    } catch (error) {
      if (error instanceof Error && error.message === 'User cancelled image selection') {
        console.log('Camera operation was cancelled by the user.');
      } else {
        console.error('Error capturing image:', error);
      }
    }
  };

  // Expo Image Picker handlers
  const handleExpoPickerGallery = async () => {
    try {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Expo Image Picker - Gallery:', result);

      if (!result.canceled) {
        setExpoPickerImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image with Expo:', error);
    }
  };

  const handleExpoPickerCamera = async () => {
    try {
      // Request camera permissions
      const permissionResult = await ExpoImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert('Camera permission is required!');
        return;
      }

      const result = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Expo Image Picker - Camera:', result);

      if (!result.canceled) {
        setExpoPickerImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error capturing image with Expo:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.scrollView} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      <TouchableOpacity 
        onPress={() => {
          console.log('ProfessionalStatsScreen');
          router.push('/professionalStatsScreen');
        }}
        style={{
          backgroundColor: '#3B82F6',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginBottom: 12,
          alignItems: 'center',
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          Professional Stats Screen
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => {
          console.log('userStatsScreen');
          router.push('/userStatsScreen');
        }}
        style={{
          backgroundColor: '#10B981',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginBottom: 20,
          alignItems: 'center',
          shadowColor: '#10B981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          User Stats Screen
        </Text>
      </TouchableOpacity>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Media Picker Studio</Text>
        <Text style={styles.headerSubtitle}>Compare & choose the best library for your needs</Text>
      </View>

      {/* React Native Image Crop Picker Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>🔧 React Native Crop Picker</Text>
            <Text style={styles.cardSubtitle}>Native performance with advanced features</Text>
          </View>
          <View style={styles.nativeBadge}>
            <Text style={styles.badgeText}>NATIVE</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.nativeButton]} 
            onPress={handleCropPickerGallery}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>📱</Text>
            <Text style={styles.buttonLabel}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.nativeButton]} 
            onPress={handleCropPickerCamera}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={styles.buttonLabel}>Camera</Text>
          </TouchableOpacity>
        </View>

        {cropPickerImage ? (
          <View style={styles.mediaPreview}>
            <View style={styles.mediaHeader}>
              <Text style={styles.mediaTitle}>✓ Selected Image</Text>
              <TouchableOpacity 
                style={styles.clearButtonSmall}
                onPress={() => setCropPickerImage('')}
              >
                <Text style={styles.clearIcon}>×</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: cropPickerImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🖼️</Text>
            <Text style={styles.emptyText}>No image selected</Text>
          </View>
        )}
      </View>

      {/* Expo Image Picker Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>⚡ Expo Image Picker</Text>
            <Text style={styles.cardSubtitle}>Quick setup with managed workflow</Text>
          </View>
          <View style={styles.expoBadge}>
            <Text style={styles.badgeText}>EXPO</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.expoButton]} 
            onPress={handleExpoPickerGallery}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>📱</Text>
            <Text style={[styles.buttonLabel, styles.expoButtonText]}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.expoButton]} 
            onPress={handleExpoPickerCamera}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={[styles.buttonLabel, styles.expoButtonText]}>Camera</Text>
          </TouchableOpacity>
        </View>

        {expoPickerImage ? (
          <View style={styles.mediaPreview}>
            <View style={styles.mediaHeader}>
              <Text style={styles.mediaTitle}>✓ Selected Image</Text>
              <TouchableOpacity 
                style={styles.clearButtonSmall}
                onPress={() => setExpoPickerImage('')}
              >
                <Text style={styles.clearIcon}>×</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: expoPickerImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🖼️</Text>
            <Text style={styles.emptyText}>No image selected</Text>
          </View>
        )}
      </View>

      {/* Video Picker Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>🎬 Video Recorder</Text>
            <Text style={styles.cardSubtitle}>Record or upload high-quality videos</Text>
          </View>
          <View style={styles.videoBadge}>
            <Text style={styles.badgeText}>VIDEO</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.videoButton]} 
            onPress={handleCropPickerVideoCamera}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>🎥</Text>
            <Text style={styles.buttonLabel}>Record</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.videoButton]} 
            onPress={handleCropPickerVideoGallery}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonIcon}>📹</Text>
            <Text style={styles.buttonLabel}>Upload</Text>
          </TouchableOpacity>
        </View>

        {cropPickerVideo ? (
          <View style={styles.mediaPreview}>
            <View style={styles.mediaHeader}>
              <Text style={styles.mediaTitle}>✓ Selected Video</Text>
              <TouchableOpacity 
                style={styles.clearButtonSmall}
                onPress={() => setCropPickerVideo('')}
              >
                <Text style={styles.clearIcon}>×</Text>
              </TouchableOpacity>
            </View>
            <Video
              source={{ uri: cropPickerVideo }}
              style={styles.previewVideo}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎞️</Text>
            <Text style={styles.emptyText}>No video selected</Text>
          </View>
        )}
      </View>

      {/* Comparison Card */}
      <View style={styles.comparisonCard}>
        <Text style={styles.comparisonTitle}>📊 Feature Comparison</Text>
        
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>⚡</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureName}>Performance</Text>
            <Text style={styles.featureDescription}>Native picker offers better performance for large media files</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>✂️</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureName}>Built-in Cropping</Text>
            <Text style={styles.featureDescription}>React Native Crop Picker includes advanced image editing</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>🚀</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureName}>Easy Setup</Text>
            <Text style={styles.featureDescription}>Expo picker requires minimal configuration</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>🎥</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureName}>Video Support</Text>
            <Text style={styles.featureDescription}>Both libraries support video recording and selection</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: CARD_PADDING,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    marginTop: Platform.OS === 'ios' ? 20 : 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: CARD_GAP,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitleContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  nativeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  expoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  videoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  nativeButton: {
    backgroundColor: '#3B82F6',
  },
  expoButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  videoButton: {
    backgroundColor: '#EF4444',
  },
  buttonIcon: {
    fontSize: 20,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  expoButtonText: {
    color: '#8B5CF6',
  },
  mediaPreview: {
    marginTop: 8,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mediaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  clearButtonSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 20,
    color: '#EF4444',
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 280,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
  },
  previewVideo: {
    width: '100%',
    height: 280,
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  comparisonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureContent: {
    flex: 1,
    paddingTop: 2,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
  },
});



export default index;