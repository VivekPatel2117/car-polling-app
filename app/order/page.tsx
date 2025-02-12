import { Payment, columns } from "./coloumn"
import { DataTable } from "./data-table"
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
async function getData(): Promise<Payment[]> {
  return [
    {"id": "BFB",
      "name": "Maruti",
      "model":"Breeza",
      "amount":150.00,
      "status":"processing",
      "email":"vivekpatel@gmail.com",
      "start_date":"1st March 2025",
      "end_date":"5th March 2025"
    },
    {"id": "BFB",
      "name": "Maruti",
      "model":"Breeza",
      "amount":150.00,
      "status":"processing",
      "email":"sam@gmail.com",
       "start_date":"1st March 2025",
      "end_date":"5th March 2025"
    }
  ]
}

export default async function page() {
  const data = await getData()

  return (
    <>
    <Navbar/>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    <Footer/>
    </>
  )
}
