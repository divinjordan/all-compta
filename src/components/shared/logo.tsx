import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-4">
      <Image
        src="/images/Logo.jpg"
        width={150}
        height={(150 * 571) / 926}
        alt="Your Name"
      />
    </div>
  );
}
