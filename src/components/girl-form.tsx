"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cupSizeList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;
type CupSize = (typeof cupSizeList)[number];

export function GirlForm() {
  const registerGirl = async (event: React.FormEvent) => {
    event.preventDefault();

    // cupSize is a neccessary field
    if (cupSize === null) {
      alert("Please select a cup size");
      return;
    }

    // name is a neccessary field
    if (!firstName || !lastName) {
      alert("Please fill in the name fields");
      return;
    }

    await fetch("http://localhost:8080/girl.v1.GirlService/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        girl: {
          name: {
            firstname: firstName,
            lastname: lastName,
          },
          age: age,
          cup: cupSize,
          hip: hipSize,
          height: height,
        },
      }),
    }).catch(() => {
      alert("An error occurred while registering");
    });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(160);
  const [hipSize, setHipSize] = useState(90);
  const [cupSize, setCupSize] = useState<CupSize | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">
            Girl's Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-purple-600 font-bold"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-pink-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-purple-600 font-bold">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-pink-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-purple-600 font-bold">
                Age: {age} years
              </Label>
              <Slider
                id="age"
                min={18}
                max={40}
                step={1}
                value={[age]}
                onValueChange={(value) => setAge(value[0])}
                className="text-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-purple-600 font-bold">
                Height: {height} cm
              </Label>
              <Slider
                id="height"
                min={130}
                max={170}
                step={1}
                value={[height]}
                onValueChange={(value) => setHeight(value[0])}
                className="text-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hipSize" className="text-purple-600 font-bold">
                Hip Size: {hipSize} cm
              </Label>
              <Slider
                id="hipSize"
                min={70}
                max={100}
                step={1}
                value={[hipSize]}
                onValueChange={(value) => setHipSize(value[0])}
                className="text-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-600 font-bold">Cup Size</Label>
              <div className="grid grid-cols-5 gap-2">
                {cupSizeList.map((size) => (
                  <Button
                    key={size}
                    variant={cupSize === size ? "default" : "outline"}
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setCupSize(size);
                    }}
                    className={`w-full h-16 ${
                      cupSize === size
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : "hover:bg-pink-100 text-purple-600"
                    }`}
                  >
                    {size}
                    <span className="sr-only">Cup Size {size}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={registerGirl}
              className="w-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Create Profile ✨
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
