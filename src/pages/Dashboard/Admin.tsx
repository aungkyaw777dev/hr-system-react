import { FullDonutChart } from "@/components/ui/donutchart";
import PieChartWithPercentage from "@/components/ui/piechartwithpercentage";
import { UsersRound } from "lucide-react";

/* eslint-disable react-refresh/only-export-components */
export default function () {


  return <>
    <div className="flex flex-col gap-2 m-6 w-full h-auto">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-[50%] bg-natural-50 py-3 px-2 me-4 rounded-xl shadow-sm flex flex-col justify-between">
          <p className="text-text font-medium text-2xl">Check In/Out</p>
          <div className="flex items-center justify-end flex-col gap-2 flex-1">
            <div className="checkin-circle flex items-center justify-center">
              <p className="text-white font-bold text-xl">Check In</p>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <div>
                <p>20/Oct/2025</p>
              </div>
              <p className="font-bold pb-2">Check In: ------ | check Out: ------</p>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <PieChartWithPercentage />
        </div>
      </div>
      <div className="bg-natural-50 rounded p-4">
        <div className="flex justify-between">
          <p className="text-2xl font-medium">Attendance Overview</p>
          <div className="p-2 bg-primary-50 text-primary-500 rounded">
            <p>Today</p>
          </div>
        </div>
        <div className="flex gap-3 w-full text-primary-700">
          <div className="bg-primary-100 p-2 rounded w-60 flex flex-col">
            <div className="flex justify-between w-full ">
              <p className="font-bold ">Total Employee</p>
              <UsersRound />
            </div>
            <div className="font-bold text-4xl pt-5">
              <p>250</p>
            </div>
          </div>
          <div>
            <FullDonutChart values={[40, 25, 15]} colors={['#02B16C', '#FFDF20', '#E7000B']} size={120} strokeWidth={10} />
          </div>
        </div>
      </div>
    </div>
  </>;
}
