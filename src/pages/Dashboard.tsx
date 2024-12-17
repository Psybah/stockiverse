import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/charts";

const salesData = [
  { name: "Jan", total: 480000 },
  { name: "Feb", total: 840000 },
  { name: "Mar", total: 720000 },
  { name: "Apr", total: 960000 },
  { name: "May", total: 1120000 },
  { name: "Jun", total: 1280000 },
];

const inventoryData = [
  { name: "Electronics", value: 45 },
  { name: "Clothing", value: 30 },
  { name: "Food", value: 15 },
  { name: "Other", value: 10 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">₦18,092,756</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">+201 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <LineChart
              data={salesData}
              index="name"
              categories={["total"]}
              colors={["blue"]}
              valueFormatter={(value: number) => `₦${value.toLocaleString()}`}
              className="h-full w-full"
            />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Inventory Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px]">
            <BarChart
              data={inventoryData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value: number) => `${value}%`}
              className="h-full w-full"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}