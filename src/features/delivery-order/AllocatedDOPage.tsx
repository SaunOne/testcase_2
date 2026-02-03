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
    <div className="space-y-6">
      <Card>
        {/* Tabs dalam Card */}
        <Card padding="none">
          <TabsSection />
        </Card>

        {/* Info Alert */}
        <Alert variant="info">
          Please input items to order based on UOM type
        </Alert>

        {/* Form Section - sudah ada Card di dalamnya */}
        <FormSection />

        {/* Table Section dalam Card */}

        <TableSection />

        {/* Summary & Footer */}
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <FooterSection />
          </div>
          <SummarySection />
        </div>
      </Card>
    </div>
  )
}
