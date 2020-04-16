const spawn = require('cross-spawn');

/* 删除 dist */
spawn.sync('rm', ['-rf','dist'], { stdio: 'inherit' });
/* 重新打包 */
spawn.sync('webpack', ['--mode development'], { stdio: 'inherit' });
