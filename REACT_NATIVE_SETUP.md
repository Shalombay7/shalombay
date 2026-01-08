# React Native Mobile App Setup

Follow these steps to create the Shalom Bay mobile app with Expo:

## 1️⃣ Create the Expo App

```bash
cd ../
npx create-expo-app shalom-bay-mobile
cd shalom-bay-mobile
```

## 2️⃣ Install Dependencies

```bash
npm install react-native-linking expo-linking
npm install axios
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install expo-constants
```

## 3️⃣ Create App Structure

```
shalom-bay-mobile/
├── App.tsx
├── app.json
├── screens/
│   ├── HomeScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   └── CartScreen.tsx
├── components/
│   ├── ProductCard.tsx
│   └── Header.tsx
├── services/
│   ├── api.ts
│   └── config.ts
└── styles/
    └── colors.ts
```

## 4️⃣ Run the App

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## 5️⃣ Build for Production

```bash
npx expo build:android
npx expo build:ios
```

## Notes
- The app fetches products from your backend API
- WhatsApp integration for orders
- Beautiful UI with React Navigation
- Responsive design for all phone sizes
