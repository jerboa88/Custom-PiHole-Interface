# Custom Pi-hole Interface

This project is forked from the [Pi-hole Admin Dashboard](https://github.com/pi-hole/AdminLTE), which was made using [AdminLTE](https://almsaeedstudio.com) and released under the MIT License. Modifications to this project made by me or others is also licensed under MIT.

This project will create a Web interface for the ad-blocking [Pi-hole](https://github.com/pi-hole/pi-hole). From this interface, you will be able to see stats on how well your Pi-hole is performing and update the lists used to block ads.

These are screenshots of the original project:
![Pi-hole Web interface](http://i.imgur.com/5lLAUGo.png)
![Fully responsive](http://i.imgur.com/fHuWR6E.png)

## API
A read-only API can be accessed at `/admin/api.php`. With either no parameters or `api.php?summary` it returns the following JSON:
```JSON
{
	"domains_being_blocked": "136,708",
	"dns_queries_today": "18,108",
	"ads_blocked_today": "14,648",
	"ads_percentage_today": "80.9"
}
```

There are many more parameters, such as `summaryRaw`, `overTimeData`, `topItems`, `recentItems`, `getQueryTypes`, `getForwardDestinations`, `getQuerySources`, and finally `getAllQueries`.
