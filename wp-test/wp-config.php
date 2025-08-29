<?php
/**
 * WordPress configuration for DeweloperJawneCeny test environment
 * OVH Web Cloud Database connection
 */

// ** Database settings - OVH Web Cloud Database ** //
define( 'DB_NAME', 'deweloper_test' );
define( 'DB_USER', 'admin' );
define( 'DB_PASSWORD', 'Bartek07291' );
define( 'DB_HOST', 'st660460-001.eu.clouddb.ovh.net:35724' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Authentication unique keys and salts ** //
define('AUTH_KEY',         '<q;[,a^MIk# ]-6V58|-K[mS@_l2*MkMr| oh+CqX/MwA3`nN65C=0~PKuqhz2Fo');
define('SECURE_AUTH_KEY',  '.-qN{~<912DB`|]Txu+z%QfdrwQXY{-_` U5z_T]A;OK?$^h|+D=::ZZ-m:C@Nn[');
define('LOGGED_IN_KEY',    '8P:<4-89;jIk,;AfmUhW|siM-L9qZjLGY28t,iJHp,#-l@i@fO0G/LTcNR%|W@LU');
define('NONCE_KEY',        'JG2$vXy5;@>o|f.cR) u2J+:^r# 7jUwt),]u3lr*dYPqm_}1dST$[*x/I@SC@gD');
define('AUTH_SALT',        ';Xhc#QoQ{)C3_ao.~SK[/%q#~[eOgxc$vcOF5b|2k?D`W&EJrQ)tEPmBtP%X#9|z');
define('SECURE_AUTH_SALT', 'o+qZT;nY3.{|UGaZHej]G|s-?65VpAjz[O7^DhvMUThR~gqFd@[-]2=~5+Aw) AV');
define('LOGGED_IN_SALT',   'CI%B{[_w2YTec0!>M=Uhcd(dkY[jAoj7g-oH]H1K=TZd#~d+}zyCf#YPi/iX1e8f');
define('NONCE_SALT',       'V#w[u 1G3?D^.P!@Xb?MnCjT7sE1-:Rn<,oQ|M@nIo#N~c)UW&@;A7[gxQ/5+sEv');

// ** WordPress database table prefix ** //
$table_prefix = 'wp_';

// ** WordPress debugging mode ** //
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

// ** WordPress URLs ** //
define( 'WP_HOME', 'https://deweloperjawneceny.pl/wp-test' );
define( 'WP_SITEURL', 'https://deweloperjawneceny.pl/wp-test' );

// ** Force SSL ** //
define( 'FORCE_SSL_ADMIN', true );

// ** Disable file editing in admin ** //
define( 'DISALLOW_FILE_EDIT', true );

// ** Memory limit ** //
define( 'WP_MEMORY_LIMIT', '256M' );

// ** That's all, stop editing! Happy publishing. ** //
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';