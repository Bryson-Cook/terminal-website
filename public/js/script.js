var admin = false;

function white(input) {
    return '[[;white;black]' + input + ']';
}

function red(input) {
    return '[[;red;black]' + input + ']';
}

function blank() {

}

var cmd = {
    about: function() {
        this.echo()
        this.echo('I am a computer science student at Colorado State University, graduating December 2023,')
        this.echo('actively seeking internship opportunities in software engineering or embedded systems.');
        this.echo('With a current interest in OS development, I\'m working on an operating system for');
        this.echo('the x86 architecture with plans to support a file system, command line interface,');
        this.echo('and standalone bootloader.');
        this.echo()
    },
    clear: function() {
        this.clear();
    },
    contact: function() {
        this.echo()
        this.echo("Email:");
        this.echo('\tbryson1@colostate.edu')
        this.echo()
    },
    echo: function(arg) {
        if(arg != undefined)
            this.echo(arg);
    },
    help: function() {
        this.echo()
        this.echo(white('about') + '\t- Cool information');
        this.echo(white('clear') + '\t- Clear the terminal');
        this.echo(white('contact') + '\t- Contact information');
        this.echo(white('echo') + '\t- Print stuff');
        this.echo(white('help') + '\t- Display this menu');
        this.echo(white('links') + '\t- Useful links')
        // this.echo('projects\t Very cool projects');
        this.echo(white('restart') + '\t- Reset the terminal');
        // this.echo('resume\t- That one document');
        if(admin) {
            this.echo(white('secret') + '\t- What is this?')
        } else {
            this.echo(white('su') + '\t\t- Do not use');
        }
        this.echo()
    },
    links: function() {
        this.echo()
        this.echo('Github:');
        this.echo('\thttps://github.com/Bryson-Cook')
        this.echo('Linkedin:')
        this.echo('\tMIA...')
        this.echo()
    },
    // projects: function() {
    //     this.echo('Coming soon...');
    // },
    restart: function() {
        this.set_prompt('guest@brysoncook.com >> ');
        this.reset();
        admin = false;
    },
    // resume: function() {
    //     this.echo("Coming soon...");
    // },
    su: function() {
        if(!admin) {
            this.echo()
            this.echo('What are you doing?')
            this.echo()
            this.set_prompt('admin@brysoncook.com >> ')
            admin = true;
        }
    },
    secret: function() {
        if(admin) {
            this.echo()
            this.echo("Welcome super user.")
            this.echo('We regret to inform you that there is no mission available at this time.');
            this.echo('Please be patient as we gather more intel. Thank you.')
            this.echo()
        } else {
            this.echo(red('Command \'secret\' Not Found!'))
        }
    }
}

$('body').terminal(cmd, {
    greetings: greeting.innerHTML,
    prompt: 'guest@brysoncook.com >> ',
    completion: true,
    checkArity: false,
    clear: false,
    exit: false,
});