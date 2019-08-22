import { AsyncStorage } from "react-native";

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

export const feeAll = async (distance, people) => {
  const fuel = (await AsyncStorage.getItem("fuel")) || 15;
  const cost = (await AsyncStorage.getItem("cost")) || 140;

  const useFuelAmount = distance / (fuel * 1000);
  // ドライバー抜き
  const feeOfFuel = useFuelAmount * cost * ((people - 1) / people);

  const reward = rateForReward(distance);

  return Math.floor(reward * (people - 1) * rateForPeople(people) + feeOfFuel);
};

export const feePerPeople = async (distance, people) => {
  const fuel = (await AsyncStorage.getItem("fuel")) || 15;
  const cost = (await AsyncStorage.getItem("cost")) || 140;

  // ガソリン消費量
  const useFuelAmount = distance / (fuel * 1000);
  // 消費したガソリンの値段
  const feeOfFuel = useFuelAmount * cost;
  // ガソリン代の一人あたりの精算（ドライバー・同乗者共に同じ）
  const feePerPeople = feeOfFuel / people;

  const reward = rateForReward(distance);

  // 報酬に人数による変動を加味して、ガソリン代を上乗せ
  const payPerPerson = reward * rateForPeople(people) + feePerPeople;

  // const check = [
  //   { 燃費: fuel },
  //   { ガソリン相場: cost },
  //   { 消費: useFuelAmount },
  //   { ガソリン値段: feeOfFuel },
  //   { 人数: people },
  //   { 一人あたりガソリン: feePerPeople },
  //   { 距離: distance },
  //   { 報酬: reward },
  //   { 一人あたり支払い: payPerPerson }
  // ];
  // console.log(check);

  return { useFuelAmount, feeOfFuel, payPerPerson };
};
