#!/bin/bash
# dns-resolve.sh - Resolve hostname to IP and update .env

HOSTNAME="svc-407cc3cd-a94a-40d0-a62c-54d3097ef533-dml.aws-virginia-8.svc.singlestore.com"
IP=$(nslookup $HOSTNAME | grep "Address:" | tail -1 | awk '{print $2}')

if [ ! -z "$IP" ]; then
    echo "Resolved $HOSTNAME to $IP"
    sed -i '' "s/SINGLESTORE_HOST=.*/SINGLESTORE_HOST=\"$IP\"/" .env
    echo "Updated .env with IP address"
else
    echo "Failed to resolve hostname"
    exit 1
fi
