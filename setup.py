

"""
Multichain bridge for ethereum blockchain.

For full docs visit https://github.com/mamaeo/eth-multichain-bridge

"""

import sys
from setuptools import setup, find_packages

if sys.version_info < (3, 6):
    sys.exit('Please use Python version 3.6 or higher.')


def check_setuptools_features():
    """Check if setuptools is up to date."""
    import pkg_resources
    try:
        list(pkg_resources.parse_requirements('foo~=1.0'))
    except ValueError:
        sys.exit('Your Python distribution comes with an incompatible version '
                 'of `setuptools`. Please run:\n'
                 ' $ pip3 install --upgrade setuptools\n'
                 'and then run this command again')


check_setuptools_features()

install_requires = [
    'bigchaindb_driver==0.5.0a4',
    'eth-brownie==1.18.1',
    'python-dotenv==0.16.0'
]

if sys.version_info < (3, 6):
    install_requires.append('pysha3~=1.0.2')

setup(
    name='eth-multichain-bridge',
    version='1.0',
    description='MultiChainDB: The Blockchain Database',
    long_description=(
        "MultiChainDB allows developers and enterprises to deploy blockchain "
        "proof-of-concepts, platforms and applications with a blockchain "
        "database. MultiChainDB supports a wide range of industries and use cases "
        "from identity and intellectual property to supply chains, energy, IoT "
        "and financial ecosystems. With high throughput, low latency, powerful "
        "query functionality, decentralized control, immutable data storage and "
        "built-in asset support, MultiChainDB is like a database with blockchain "
        "characteristics."
        ),
    url='https://github.com/mamaeo/eth-multichain-bridge',
    author='Matteo Piacentini',
    author_email='matteo.piacentini3@studenti.unimi.it',
    license='Apache Software License 3.0',
    zip_safe=False,
    python_requires='>=3.6',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Topic :: Database',
        'Topic :: Database :: Database Engines/Servers',
        'Topic :: Software Development',
        'Natural Language :: English',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Operating System :: MacOS :: MacOS X',
        'Operating System :: POSIX :: Linux',
    ],
    packages=find_packages(exclude=['tests*']),
    install_requires=install_requires,
    setup_requires=['pytest-runner'],
)
