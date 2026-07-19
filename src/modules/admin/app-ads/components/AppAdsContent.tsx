import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "@/components/shared/TableActionsHeader"
import { SharedFormDialog } from "@/components/shared/dialog/SharedFormDialog"
import AppAdsLoading from "./AppAdsLoading"
import AppAdsError from "./AppAdsError"
import AppAdsEmpty from "./AppAdsEmpty"
import CampaignStatsSection from "./CampaignStatsCards"
import CampaignTypesSection from "./AppAndwebsiteCampaigns"
import CampaignDashboard from "./CampaignPerformance&Status"
import CampaignManager from "./CampaignManager"
import { useCreateAppAd } from "../hooks/useCreateAppAd"
import { useUpdateAppAd } from "../hooks/useUpdateAppAd"
import { useDeleteAppAd } from "../hooks/useDeleteAppAd"
import { filterAppAds, isAppAdsEmpty } from "../utils/appAds.utils"
import { APP_AD_FORM_FIELDS } from "../constants/appAds.form"
import { createAppAdSchema, type CreateAppAdFormValues } from "../schemas/appAds.schema"
import type { AppAd } from "../types/appAds.types"
import type { UseAppAdsResult } from "../hooks/useAppAds"

type AppAdDialogState =
  | { mode: "create" }
  | { mode: "edit"; appAd: AppAd }

const APP_AD_DIALOG_DEFAULT_VALUES: CreateAppAdFormValues = {
  name: "",
  budget: "0",
  status: "SCHEDULED",
}

export default function AppAdsContent({ data, isLoading, isError, error, refetch }: UseAppAdsResult) {
  const [search, setSearch] = useState("")
  const [dialogState, setDialogState] = useState<AppAdDialogState | null>(null)
  const createAppAd = useCreateAppAd()
  const updateAppAd = useUpdateAppAd()
  const deleteAppAd = useDeleteAppAd()

  if (isLoading) return <AppAdsLoading />
  if (isError) return <AppAdsError message={error?.message} onRetry={refetch} />
  if (!data || isAppAdsEmpty(data)) return <AppAdsEmpty />

  const filteredAppAds = filterAppAds(data, search)

  const handleAddCampaign = () => {
    setDialogState({ mode: "create" })
  }

  const handleEdit = (appAd: AppAd) => {
    setDialogState({ mode: "edit", appAd })
  }

  const handleDelete = (appAd: AppAd) => {
    if (confirm(`Are you sure you want to delete "${appAd.name}"?`)) {
      deleteAppAd.mutate(appAd.id)
    }
  }

  const handleDialogSubmit = (values: CreateAppAdFormValues) => {
    if (dialogState?.mode === "edit") {
      updateAppAd.mutate({ id: dialogState.appAd.id, ...values })
    } else {
      createAppAd.mutate(values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreateAppAdFormValues =
    dialogState?.mode === "edit"
      ? {
          ...APP_AD_DIALOG_DEFAULT_VALUES,
          name: dialogState.appAd.name,
          status: dialogState.appAd.status,
          budget: dialogState.appAd.budget.toString(),
        }
      : APP_AD_DIALOG_DEFAULT_VALUES

  return (
    <>
      <TableActionsHeader
        showFilter={false}
        title="Ad Campaigns"
        subtitle="Manage and monitor your advertising campaigns"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search campaigns..."
        actionButtonText="Add Campaign"
        onActionClick={handleAddCampaign}
      />
      <CampaignStatsSection campaigns={data} />
      <CampaignTypesSection />
      <CampaignDashboard campaigns={data} />
      <CampaignManager data={filteredAppAds} onEdit={handleEdit} onDelete={handleDelete} />

      <SharedFormDialog<CreateAppAdFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit Campaign" : "Add New Campaign"}
        fields={APP_AD_FORM_FIELDS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createAppAdSchema)}
        onSubmit={handleDialogSubmit}
        loading={createAppAd.isPending || updateAppAd.isPending}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Save"}
      />
    </>
  )
}
