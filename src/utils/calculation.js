import { AsyncStorage } from "react-native";
import {
  GOOGLE_MAP_DIRECTIONS_KEY,
  GOOGLE_MAP_DIRECTIONS_URL
} from "react-native-dotenv";

const fetchData = async (origin, destination) => {
  return await fetch(
    `${GOOGLE_MAP_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_MAP_DIRECTIONS_KEY}`
  )
    .then(res => res.json())
    .catch(e => e.json().then(err => console.log(err)));
};

// 移動距離に応じたドライバーへの報酬, メートル
const rateForReward = distance => {
  switch (true) {
    case distance < 1500:
      return 100;
    case distance < 3000:
      return 200;
    case distance < 10000:
      return 500;
    default:
      return 500 + (distance / 1000) * 0.2 * Math.log(distance);
  }
};

// 人数による調整
const rateForPeople = people => {
  switch (people) {
    case 2:
      return 1;
    case 3:
      return 0.8;
    case 4:
      return 0.5;
    default:
      return 0.3;
  }
};

export const feePerPeople = async (origin, destination, people) => {
  const data = await fetchData(origin, destination);
  const route = data.routes[0];
  const leg = route.legs[0];

  // const duration = leg.duration.value
  const distance = leg.distance.value;

  const fuel = (await AsyncStorage.getItem("fuel")) || 15;
  const cost = (await AsyncStorage.getItem("cost")) || 140;

  // ガソリン消費量
  const use_fuel_amount = distance / (fuel * 1000);
  // 消費したガソリンの値段
  const fee = use_fuel_amount * cost;
  // ガソリン代の一人あたりの精算（ドライバー・同乗者共に同じ）
  const fee_per_people = fee / people;

  const reward = rateForReward(distance);

  // 報酬に人数による変動を加味して、ガソリン代を上乗せ
  const pay_per_person = reward * rateForPeople(people) + fee_per_people;

  const check = [
    { 燃費: fuel },
    { ガソリン相場: cost },
    { 消費: use_fuel_amount },
    { ガソリン値段: fee },
    { 人数: people },
    { 一人あたりガソリン: fee_per_people },
    { 距離: distance },
    { 報酬: reward },
    { 一人あたり支払い: pay_per_person }
  ];
  console.log(check);

  return pay_per_person;
};
