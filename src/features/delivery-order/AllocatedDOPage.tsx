import { Alert, Card } from "../../components/ui"
import {
  TabsSection,
  FormSection,
  TableSection,
  SummarySection,
  FooterSection,
} from "./sections"

export function AllocatedDOPage() {
  return (
    <Card className="flex flex-col min-h-[calc(100vh-10rem)]">
      {/* Tabs */}
      <TabsSection />

      {/* Info Alert */}
      <div className="mt-4">
        <Alert variant="info">
          Please input items to order based on UOM type
        </Alert>
      </div>

      {/* Form Section */}
      <div className="mt-6">
        <FormSection />
      </div>

      {/* Table Section - flex-1 to push footer to bottom */}
      <div className="mt-6 flex-1">
        <TableSection />
      </div>

      {/* Footer - inside Card, at bottom */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col gap-4">
        <div className="flex justify-end">
          <div className="w-72">
            <SummarySection />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <FooterSection />
        </div>
      </div>
    </Card>
  )
}
