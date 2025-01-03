
export default function checkAppPermission (app:any){
    const APP_NAME= 'StockTrackingPo2'
    if(app?.[APP_NAME]?.accessPermission === 'permissible' && app?.[APP_NAME]?.versionPermission.includes('all')){
        return true
    }

return false
}
