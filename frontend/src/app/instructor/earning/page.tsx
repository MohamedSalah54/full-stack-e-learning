import EarningBrief from "@/components/instructor/earning/EarningBrief"
import EarningStatistics from "@/components/instructor/earning/EarningStatistics"
import MethodDetails from "@/components/instructor/earning/MethodDetails"
import WithdrawHistory from "@/components/instructor/earning/WithdrawHistory"
import WithdrawMoney from "@/components/instructor/earning/WithdrawMoney"

const page = () => {
  return (
    <>
        <EarningBrief/>
        <div className="mt-8 flex gap-17">
            <EarningStatistics />
            <WithdrawMoney/>
        </div>
        <div className="mt-10 flex gap-17">
            <WithdrawHistory/>
            <MethodDetails/>
        </div>
    </>
  )
}

export default page