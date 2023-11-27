"use client";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "2rem",
      }}
    >
      <Button variant="contained" onClick={() => router.push("/calls")}>
        Перейти к звонкам
      </Button>
    </div>
  );
}
