<?php
	require "header.html";
?>
<!-- Small boxes (Stat box) -->
<div class="row">
	<div class="col-lg-4 col-sm-12">
		<!-- /.info-box -->
		<div class="info-box bg-green">
			<span class="info-box-icon"><i class="fa fa-tasks"></i></span>
			<div class="info-box-content">
				<span class="info-box-text">DNS Queries Today</span>
				<span class="info-box-number" id="dns_queries_today">0</span>
			</div>
		</div>
	</div>

	<!-- ./col -->
	<div class="col-lg-4 col-sm-12">
		<!-- /.info-box -->
		<div class="info-box bg-red">
			<span class="info-box-icon"><i class="fa fa-ban"></i></span>
			<div class="info-box-content">
				<span class="info-box-text">Ads blocked today</span>
				<span class="info-box-number" id="ads_blocked_today">0</span>
				<!-- The progress section is optional -->
				<div class="progress"><div class="progress-bar" id="ads_percentage_today_progress"></div></div>
				<span class="progress-description" id="ads_percentage_today"><span>99</span>% Of Traffic Is Ads</span>
			</div>
		</div>
	</div>

	<!-- ./col -->
	<div class="col-lg-4 col-sm-12">
		<!-- /.info-box -->
		<div class="info-box bg-yellow">
			<span class="info-box-icon"><i class="fa fa-shield"></i></span>
			<div class="info-box-content">
				<span class="info-box-text">Domains Being Blocked</span>
				<span class="info-box-number" id="domains_being_blocked">0</span>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-12">
	<div class="box" id="queries-over-time">
		<div class="box-header with-border">
			<h3 class="box-title">Queries over time</h3>
		</div>
		<div class="box-body">
			<div class="chart">
			<canvas id="queryOverTimeChart" width="932" height="494"></canvas>
			</div>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-6">
	<div class="box" id="query-types">
		<div class="box-header with-border">
			<h3 class="box-title">Query Types</h3>
		</div>
		<div class="box-body">
			<div class="chart">
			<canvas id="queryTypeChart" width="932" height="494"></canvas>
			</div>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
	</div>
	<div class="col-md-6">
	<div class="box" id="forward-destinations">
		<div class="box-header with-border">
			<h3 class="box-title">Forward Destinations</h3>
		</div>
		<div class="box-body">
			<div class="chart">
			<canvas id="forwardDestinationChart" width="932" height="494"></canvas>
			</div>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
	</div>
</div>

<div class="row">
		<div class="col-lg-4 col-md-12">
		<div class="box" id="domain-frequency">
		<div class="box-header with-border">
			<h3 class="box-title">Top Domains</h3>
		</div>
		<!-- /.box-header -->
		<div class="box-body">
			<table class="table table-bordered">
			<tbody><tr>
				<th>Domain</th>
				<th>Hits</th>
				<th>Frequency</th>
			</tr>
			</tbody></table>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
		<!-- /.box -->
	</div>
	<!-- /.col -->
	<div class="col-lg-4 col-md-12">
		<div class="box" id="ad-frequency">
		<div class="box-header with-border">
			<h3 class="box-title">Top Advertisers</h3>
		</div>
		<!-- /.box-header -->
		<div class="box-body">
			<table class="table table-bordered">
			<tbody>
				<tr>
				<th>Domain</th>
				<th>Hits</th>
				<th>Frequency</th>
				</tr>
			</tbody>
			</table>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
		<!-- /.box -->
	</div>
	<!-- /.col -->
	<div class="col-lg-4 col-md-12">
		<div class="box" id="client-frequency">
		<div class="box-header with-border">
			<h3 class="box-title">Top Clients</h3>
		</div>
		<!-- /.box-header -->
		<div class="box-body">
			<table class="table table-bordered">
			<tbody><tr>
				<th>Client</th>
				<th>Requests</th>
				<th>Frequency</th>
			</tr>
			</tbody></table>
		</div>
		<div class="overlay">
			<i class="fa custom-loader"></i>
		</div>
		<!-- /.box-body -->
		</div>
		<!-- /.box -->
	</div>
	<!-- /.col -->
</div>
<!-- /.row -->

<?php
	require "footer.php";
?>

<script src="js/pihole/index.js"></script>
