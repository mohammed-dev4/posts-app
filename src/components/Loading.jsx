import { InfinitySpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <InfinitySpin width="200" color="#155dfc" />
      <p>loading...</p>
    </div>
  );
}
